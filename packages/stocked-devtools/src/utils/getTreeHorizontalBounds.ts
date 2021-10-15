import { HierarchyPointNode } from 'd3';

export const getTreeHorizontalBounds = <T>(hierarchy: HierarchyPointNode<T>): [left: number, right: number] => {
    let left = hierarchy;
    let right = hierarchy;

    hierarchy.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
    });

    return [left.x, right.x];
};
