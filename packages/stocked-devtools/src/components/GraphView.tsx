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

export const GraphView = ({ rootNode }: Graph) => {
    const { unwrapAll, center } = useStateTree({
        rootNode: hierarchy(rootNode, (d) => d.childNodes).each((node, index) => {
            node.data.allChildren = node.children ?? [];
            node.data.id = index;
        }),
        getNodeId: (node) => node.data.id,
        hasChildren: (node) => node.data.allChildren.length > 0,
        getAllChildren: (node) => node.data.allChildren,
        getNodeName: (node) => node.data.name,
        getNodeClassName: (node) => {
            return clsx(
                classes['node'],
                (node.children ?? []).length !== node.data.allChildren.length && classes['node--collapsed'],
                node.data.type === NodeType.HIGHLIGHT && classes['node--highlight'],
                node.data.type === NodeType.ORIGIN && classes['node--origin']
            );
        },
        getLinkClassName: (node) => {
            const typesToHighlight = [NodeType.HIGHLIGHT, NodeType.ORIGIN];

            const shouldHighlight =
                typesToHighlight.includes(node.data.type) &&
                node.parent &&
                typesToHighlight.includes(node.parent.data.type);

            return clsx(classes['link'], shouldHighlight && classes['link--highlighted']);
        },
        nodeWidth: 30,
        levelHeight: 100,
        minHeight: 200,
        minWidth: 200,
        animationDuration: 500,
        graphId: 'graph'
    });

    return (
        <div className={classes['graph']}>
            <svg style={{ width: '100%', height: '100%' }} id="graph" />
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
