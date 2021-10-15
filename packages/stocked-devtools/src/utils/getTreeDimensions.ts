import { HierarchyNode } from 'd3';

export const getTreeDimensions = <T>(hierarchy: HierarchyNode<T>): [width: number, depth: number] => {
    const levelWidthMap: Record<number, number> = {};

    let maxDepth = 1;

    hierarchy.each((node) => {
        if (!(node.depth in levelWidthMap)) {
            levelWidthMap[node.depth] = 0;
        }

        if (node.depth > maxDepth) {
            maxDepth = node.depth;
        }

        levelWidthMap[node.depth] += node.children?.length || 0;
    });

    return [Math.max(...Object.values(levelWidthMap)), maxDepth];
};
