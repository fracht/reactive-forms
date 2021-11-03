import React, { useCallback, useEffect, useRef } from 'react';
import {
    BaseType,
    HierarchyNode,
    HierarchyPointNode,
    linkVertical,
    select,
    Selection,
    Transition,
    transition,
    tree,
    TreeLayout,
    zoom,
    ZoomBehavior,
    zoomIdentity
} from 'd3';

import { getTreeDimensions } from '../utils/getTreeDimensions';
import { getTreeHorizontalBounds } from '../utils/getTreeHorizontalBounds';
import { scatterTreeNodes } from '../utils/scatterTreeNodes';

export type StateTreeConfig<T> = {
    rootNode: HierarchyNode<T>;

    getNodeId: (node: HierarchyNode<T>) => number;
    hasChildren: (node: HierarchyNode<T>) => boolean;
    getAllChildren: (node: HierarchyNode<T>) => HierarchyNode<T>[];
    getNodeName: (node: HierarchyNode<T>) => string;

    getLinkClassName: (node: HierarchyNode<T>) => string;
    getNodeClassName: (node: HierarchyNode<T>) => string;

    nodeWidth: number;
    levelHeight: number;
    minWidth: number;
    minHeight: number;
    animationDuration: number;

    svgRef: React.MutableRefObject<SVGSVGElement | null>;
};

export type StateTreeControl = {
    center: () => void;
    unwrapAll: () => void;
};

export const useStateTree = <T>({
    rootNode,
    getNodeId,
    hasChildren,
    getAllChildren,
    getNodeName,
    getNodeClassName,
    getLinkClassName,
    nodeWidth,
    levelHeight,
    minWidth,
    minHeight,
    animationDuration,
    svgRef
}: StateTreeConfig<T>): StateTreeControl => {
    const elementsRef =
        useRef<{
            treeLayout: TreeLayout<T>;
            root: HierarchyNode<T>;
            svg: Selection<SVGElement, SVGSVGElement, HTMLElement, unknown>;
            linkGroup: Selection<SVGGElement, SVGSVGElement, HTMLElement, unknown>;
            nodeGroup: Selection<SVGGElement, SVGSVGElement, HTMLElement, unknown>;
            zoomBehavior: ZoomBehavior<SVGElement, SVGSVGElement>;
        }>();

    const initializeTree = useCallback(
        (root: HierarchyNode<T>) => {
            const [width, height] = getTreeDimensions(root);

            // computing new tree layout
            const treeLayout = tree<T>().size([
                Math.max(width * nodeWidth, minWidth),
                Math.max(height * levelHeight, minHeight)
            ]);

            const svg = select<SVGElement, SVGSVGElement>(svgRef.current!) as unknown as Selection<
                SVGElement,
                SVGSVGElement,
                HTMLElement,
                unknown
            >;
            const rootGroup = svg.append('g');
            const linkGroup = rootGroup.append('g');
            const nodeGroup = rootGroup.append('g');

            const zoomBehavior = zoom<SVGElement, SVGSVGElement>()
                .duration(animationDuration)
                .on('zoom', (event) => {
                    if (event.sourceEvent.type !== 'dblclick') {
                        rootGroup.attr('transform', event.transform);
                    }
                });

            svg.call(zoomBehavior);

            elementsRef.current = {
                treeLayout,
                svg,
                linkGroup,
                nodeGroup,
                root,
                zoomBehavior
            };

            return () => {
                elementsRef.current = undefined;
                rootGroup.remove();
            };
        },
        [nodeWidth, minWidth, levelHeight, minHeight, svgRef, animationDuration]
    );

    const updateTree = useCallback(
        (source?: HierarchyPointNode<T>) => {
            if (!elementsRef.current) {
                return;
            }

            const { treeLayout, svg, nodeGroup, linkGroup, root } = elementsRef.current;

            const { x: sourceNodeInitialX, y: sourceNodeInitialY } = source ?? { x: undefined, y: undefined };

            // scatter nodes so that they take up less space
            const rootNode = scatterTreeNodes(treeLayout(root), 2, 30);

            const [width, height] = treeLayout.size()!;
            rootNode.x = width / 2;
            const diagonal = linkVertical();
            const [minX] = getTreeHorizontalBounds(rootNode);

            // selecting links
            const links = linkGroup
                .selectAll<SVGPathElement, SVGPathElement>('path')
                .data(rootNode.descendants().slice(1), getNodeId as (value: unknown) => number);

            // creating new links
            const linkEnter = links
                .enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke-opacity', 0)
                .attr('class', getLinkClassName)
                .attr('d', (node) =>
                    diagonal({
                        source: [sourceNodeInitialX ?? node.parent!.x, sourceNodeInitialY ?? node.parent!.y],
                        target: [sourceNodeInitialX ?? node.x, sourceNodeInitialY ?? node.y]
                    })
                );

            // selecting nodes groups
            const nodeGroups = nodeGroup
                .selectAll<SVGGElement, SVGGElement>('g')
                .data(rootNode.descendants(), getNodeId as (value: unknown) => number);

            // creating new nodes
            const nodeEnter = nodeGroups
                .enter()
                .append('g')
                .attr(
                    'transform',
                    (d) => 'translate(' + (sourceNodeInitialX ?? d.x) + ',' + (sourceNodeInitialY ?? d.y) + ')'
                )
                .attr('class', getNodeClassName)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0)
                .on('dblclick', (e, node) => {
                    if (hasChildren(node)) {
                        node.children = node.children ? undefined : (getAllChildren(node) as HierarchyPointNode<T>[]);
                        updateTree(node);
                    }
                });

            nodeEnter.append('circle').attr('r', 5);
            nodeEnter.append('text').text(getNodeName);

            // transitions
            const currentTransition: Transition<BaseType, unknown, BaseType, unknown> = transition<BaseType>().duration(
                animationDuration
            ) as unknown as Transition<BaseType, unknown, BaseType, unknown>;

            svg.transition(currentTransition).attr('viewBox', [minX - 10, -10, width + 20, height + 20].join(' '));

            // merging nodes transition (updating old nodes to new positions)
            nodeGroups
                .merge(nodeEnter)
                .attr('class', getNodeClassName)
                .transition(currentTransition)
                .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
                .attr('fill-opacity', 1)
                .attr('stroke-opacity', 1);

            // exiting nodes transition (old nodes, which were deleted)
            nodeGroups
                .exit<SVGElement>()
                .transition(currentTransition)
                .remove()
                .attr('transform', () => `translate(${source?.x ?? 0}, ${source?.y ?? 0})`)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0);

            // merging links transition (updating old links to new positions)
            links
                .merge(linkEnter)
                .attr('class', getLinkClassName)
                .transition(currentTransition)
                .attr('d', (d) => {
                    return diagonal({ source: [d.parent!.x, d.parent!.y], target: [d.x, d.y] });
                })
                .attr('stroke-opacity', 1);

            // link exit transitions (deleting old links)
            links
                .exit()
                .transition(currentTransition)
                .remove()
                .attr('d', () =>
                    diagonal({ source: [source?.x ?? 0, source?.y ?? 0], target: [source?.x ?? 0, source?.y ?? 0] })
                )
                .attr('stroke-opacity', 0);
        },
        [animationDuration, getNodeId, getNodeClassName, getLinkClassName, getNodeName, hasChildren, getAllChildren]
    );

    useEffect(() => {
        return initializeTree(rootNode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (elementsRef.current) {
            elementsRef.current.root = rootNode;
        }

        updateTree();
    }, [updateTree, rootNode]);

    const center = useCallback(() => {
        if (!elementsRef.current) {
            return;
        }

        const { zoomBehavior, svg } = elementsRef.current;

        svg.transition().duration(animationDuration).call(zoomBehavior.transform, zoomIdentity);
    }, [animationDuration]);

    const unwrapAll = useCallback(() => {
        if (!elementsRef.current) {
            return;
        }

        const { root } = elementsRef.current;

        root.each((node) => {
            if (hasChildren(node) && node.children === undefined) {
                node.children = getAllChildren(node);
            }
        });

        updateTree();
    }, [getAllChildren, hasChildren, updateTree]);

    return {
        center,
        unwrapAll
    };
};
