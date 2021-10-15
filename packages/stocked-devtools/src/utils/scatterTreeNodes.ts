import { HierarchyPointNode } from 'd3';

export const scatterTreeNodes = <T>(
    rootNode: HierarchyPointNode<T>,
    step: number,
    offset: number
): HierarchyPointNode<T> => {
    const indexes: Record<number, number> = {};

    return rootNode.each((node) => {
        if (!(node.depth in indexes)) {
            indexes[node.depth] = 0;
        }

        node.y = node.y - (indexes[node.depth]++ % step) * offset;
    });
};
