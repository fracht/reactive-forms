import { useMemo, useRef } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { hierarchy, HierarchyNode } from 'd3';

import { ArchiveOutline } from './icons/ArchiveOutline';
import { LocateOutline } from './icons/LocateOutline';
import { SettingsOutline } from './icons/SettingsOutline';
import { useStateTree } from './useStateTree';
import { NodeCondition, StockStateNode } from '../utils/StockInfo';

import classes from './GraphView.module.scss';

type RealStockStateNode = StockStateNode & {
    id: number;
    allChildren: HierarchyNode<RealStockStateNode>[];
};

const getNodeClassName = (node: HierarchyNode<RealStockStateNode>) => {
    return clsx(
        classes['node'],
        (node.children ?? []).length !== node.data.childNodes.length && classes['node--collapsed'],
        node.data.condition === NodeCondition.HIGHLIGHT && classes['node--highlight'],
        node.data.condition === NodeCondition.ORIGIN && classes['node--origin']
    );
};

const getLinkClassName = (node: HierarchyNode<RealStockStateNode>) => {
    const typesToHighlight = [NodeCondition.HIGHLIGHT, NodeCondition.ORIGIN];

    const shouldHighlight =
        typesToHighlight.includes(node.data.condition) &&
        node.parent &&
        typesToHighlight.includes(node.parent.data.condition);

    return clsx(classes['link'], shouldHighlight && classes['link--highlighted']);
};

const getNodeName = (node: HierarchyNode<RealStockStateNode>) => node.data.name;

const getNodeId = (node: HierarchyNode<RealStockStateNode>) => node.data.id;

const hasChildren = (node: HierarchyNode<RealStockStateNode>) => node.data.childNodes.length > 0;

const getAllChildren = (node: HierarchyNode<RealStockStateNode>) => node.data.allChildren;

export type StateTreeProps = {
    rootNode: StockStateNode;
};

export const StateTree = ({ rootNode }: StateTreeProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const hierarchyRootNode = useMemo(
        () =>
            hierarchy(rootNode as RealStockStateNode, (d) => d.childNodes as RealStockStateNode[]).each(
                (node, index) => {
                    node.data.allChildren = node.children ?? [];
                    node.data.id = index;
                }
            ),
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
                    <IconButton onClick={unwrapAll} color="inherit">
                        <ArchiveOutline />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Center">
                    <IconButton onClick={center} color="inherit">
                        <LocateOutline />
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>
    );
};
