import React, { useCallback, useEffect, useRef } from 'react';
import { ContractOutline } from 'react-ionicons';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import {
    BaseType,
    ClientPointEvent,
    hierarchy,
    HierarchyNode,
    HierarchyPointNode,
    linkHorizontal,
    linkVertical,
    select,
    Selection,
    stratify,
    tree,
    TreeLayout
} from 'd3';

import classes from './GraphView.module.scss';

export type GraphNode = {
    name: string;
    childNodes: GraphNode[];
};

export type Graph = {
    rootNode: GraphNode;
};

const useGraph = () => {};

export const GraphView = ({ rootNode }: Graph) => {
    const elementsRef =
        useRef<{
            treeLayout: TreeLayout<unknown>;
            root: HierarchyNode<unknown>;
            svg: Selection<SVGSVGElement, SVGSVGElement, HTMLElement, unknown>;
            linkGroup: Selection<SVGGElement, SVGSVGElement, HTMLElement, unknown>;
            nodeGroup: Selection<SVGGElement, SVGSVGElement, HTMLElement, unknown>;
        }>();

    const initializeTree = useCallback((root: HierarchyNode<unknown>) => {
        const treeLayout = tree();

        const svg = select<SVGSVGElement, SVGSVGElement>('#graph');
        const nodeGroup = svg.append('g');
        const linkGroup = svg.append('g');

        root.each((node, index) => {
            node._children = node.children;
            node.id = index;
        });

        elementsRef.current = {
            treeLayout,
            svg,
            linkGroup,
            nodeGroup,
            root
        };
    }, []);

    const updateTreeRef = useCallback((source?: HierarchyPointNode<unknown>) => {
        if (!elementsRef.current) {
            return;
        }

        const x0 = source?.x;
        const y0 = source?.y;

        const { treeLayout, svg, nodeGroup, linkGroup, root } = elementsRef.current;

        const marginX = 20;
        const marginY = 20;

        const levelOnDescendants: Record<number, number> = {};

        root.each((node) => {
            if (!(node.depth in levelOnDescendants)) {
                levelOnDescendants[node.depth] = 0;
            }

            levelOnDescendants[node.depth] += node.children?.length || 0;
        });

        const height = 1000;
        const width = Math.max(Math.max(...Object.values(levelOnDescendants)) * 30, 1000);

        const indexes: Record<number, number> = {};

        treeLayout.size([width, height]);

        const nodes = treeLayout(root).each((node) => {
            if (!(node.depth in indexes)) {
                indexes[node.depth] = 0;
            }

            node.y = node.y - (indexes[node.depth]++ % 2) * 30;
        });

        nodes.x = width / 2;

        const diagonal = linkVertical();

        let left = nodes;
        let right = nodes;

        nodes.eachBefore((node) => {
            if (node.x < left.x) left = node;
            if (node.x > right.x) right = node;
        });

        const transition = svg
            .transition()
            .duration(500)
            .attr('width', width + marginX)
            .attr('height', height + marginY * 2)
            .attr('viewBox', [left.x - marginX, marginY, width, height].join(' '));
        // .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'));

        const node = nodeGroup.selectAll('g').data(nodes.descendants(), (node) => node.id);

        const nodeEnter = node
            .enter()
            .append('g')
            .attr('transform', (d) => 'translate(' + (x0 ?? d.x) + ',' + (y0 ?? d.y) + ')')
            .attr('fill-opacity', 0)
            .style('cursor', 'pointer')
            .style('pointer-events', 'all')
            .attr('stroke-opacity', 0)
            .on('click', (event, d) => {
                d.children = d.children ? null : d._children;
                updateTreeRef(d);
            });
        const links = linkGroup.selectAll('path').data(nodes.descendants().slice(1), (node) => node.id);

        const linkEnter = links
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', '#cdcdcdcc')
            .attr('stroke-opacity', 0)
            .attr('d', (d) =>
                diagonal({ source: [x0 ?? d.parent!.x, y0 ?? d.parent!.y], target: [x0 ?? d.x, y0 ?? d.y] })
            );

        nodeEnter
            .append('circle')
            .attr('r', 5)
            .style('fill', (datum) => (datum._children?.length > 0 ? '#0d0d0d' : '#cdcdcd'));

        nodeEnter
            .append('text')
            .attr('dy', '12px')
            .style('font-size', '12px')
            .attr('fill', 'white')
            .attr('x', (d) => d.depth)
            .attr('y', (d) => (d.children ? -24 : 5))
            .style('text-anchor', 'middle')
            .text((d) => d.data.name);

        const nodeUpdate = node
            .merge(nodeEnter)
            .transition(transition)
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
            .attr('fill-opacity', 1)
            .attr('stroke-opacity', 1);

        const nodeExit = node
            .exit()
            .transition(transition)
            .remove()
            .attr('transform', (d: HierarchyPointNode<unknown>) => `translate(${source?.x ?? 0}, ${source?.y ?? 0})`)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0);

        const linkUpdate = links
            .merge(linkEnter)
            .transition(transition)
            .attr('d', (d) => diagonal({ source: [d.parent!.x, d.parent!.y], target: [d.x, d.y] }))
            .attr('stroke-opacity', 1);

        const linkExit = links
            .exit()
            .transition(transition)
            .remove()
            .attr('d', () =>
                diagonal({ source: [source?.x ?? 0, source?.y ?? 0], target: [source?.x ?? 0, source?.y ?? 0] })
            )
            .attr('stroke-opacity', 0);
    }, []);

    useEffect(() => {
        initializeTree(hierarchy(rootNode, (node) => node.childNodes));
    }, []);

    useEffect(() => {
        updateTreeRef();
    }, []);

    return (
        <div className={classes['graph']}>
            {/* <TransformWrapper limitToBounds={false} centerOnInit={true}>
                {({ resetTransform }) => ( */}
            {/* <React.Fragment> */}
            {/* <TransformComponent wrapperClass={classes['drag-wrapper']}> */}
            <svg id="graph" />
            {/* </TransformComponent> */}
            {/* <button onClick={resetTransform}>
                            <ContractOutline />
                        </button>
                     </React.Fragment>
                 )}
             </TransformWrapper> */}
        </div>
    );
};
