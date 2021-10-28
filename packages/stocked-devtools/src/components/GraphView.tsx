import { useMemo, useRef } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { hierarchy, HierarchyNode } from 'd3';

import { ArchiveOutline } from './icons/ArchiveOutline';
import { LocateOutline } from './icons/LocateOutline';
import { SettingsOutline } from './icons/SettingsOutline';
import { useStateTree } from './useStateTree';

import classes from './GraphView.module.scss';

export type GraphNode = {
    childNodes: GraphNode[];
} & GraphNodeData;

export enum NodeType {
    ORIGIN,
    HIGHLIGHT,
    DEFAULT
}

export type GraphNodeData = {
    allChildren: HierarchyNode<GraphNode>[];
    id: number;
    name: string;
    type: NodeType;
};

export type Graph = {
    rootNode: GraphNode;
};

const getNodeClassName = (node: HierarchyNode<GraphNode>) => {
    return clsx(
        classes['node'],
        (node.children ?? []).length !== node.data.allChildren.length && classes['node--collapsed'],
        node.data.type === NodeType.HIGHLIGHT && classes['node--highlight'],
        node.data.type === NodeType.ORIGIN && classes['node--origin']
    );
};

const getLinkClassName = (node: HierarchyNode<GraphNode>) => {
    const typesToHighlight = [NodeType.HIGHLIGHT, NodeType.ORIGIN];

    const shouldHighlight =
        typesToHighlight.includes(node.data.type) && node.parent && typesToHighlight.includes(node.parent.data.type);

    return clsx(classes['link'], shouldHighlight && classes['link--highlighted']);
};

const getNodeName = (node: HierarchyNode<GraphNode>) => node.data.name;

const getNodeId = (node: HierarchyNode<GraphNode>) => node.data.id;

const hasChildren = (node: HierarchyNode<GraphNode>) => node.data.allChildren.length > 0;

const getAllChildren = (node: HierarchyNode<GraphNode>) => node.data.allChildren;

export const GraphView = ({ rootNode }: Graph) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const hierarchyRootNode = useMemo(
        () =>
            hierarchy(rootNode, (d) => d.childNodes).each((node, index) => {
                node.data.allChildren = node.children ?? [];
                node.data.id = index;
            }),
        [rootNode]
    );

    const { unwrapAll, center } = useStateTree({
        rootNode: hierarchyRootNode,
        getNodeId,
        hasChildren,
        getAllChildren,
        getNodeName,
        getNodeClassName,
        getLinkClassName,
        nodeWidth: 30,
        levelHeight: 100,
        minHeight: 200,
        minWidth: 200,
        animationDuration: 500,
        svgRef
    });

    return (
        <div className={classes['graph']}>
            <svg style={{ width: '100%', height: '100%' }} ref={svgRef} />
            <Stack direction="row" spacing={1} className={classes['button-bar']}>
                <Tooltip title="Settings">
                    <IconButton color="inherit">
                        <SettingsOutline />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Unwrap all nodes">
                    <IconButton color="inherit">
                        <ArchiveOutline onClick={unwrapAll} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Center">
                    <IconButton color="inherit">
                        <LocateOutline onClick={center} />
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>
    );
};
