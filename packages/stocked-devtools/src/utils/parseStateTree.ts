import { createPxth, pxthToString } from 'pxth';

import { NodeCondition, StockStateNode } from './StockInfo';

export type BatchUpdate = {
    values: object;
    origin: string[];
    paths: string[];
};

const getCondition = (batchUpdate: BatchUpdate, path: string[]): NodeCondition => {
    const stringifiedPath = pxthToString(createPxth(path));

    if (pxthToString(createPxth(batchUpdate.origin)) === stringifiedPath) {
        return NodeCondition.ORIGIN;
    }

    if (batchUpdate.paths.includes(stringifiedPath as string)) {
        return NodeCondition.HIGHLIGHT;
    }

    return NodeCondition.IDLE;
};

export const parseStateTree = (batchUpdate: BatchUpdate): StockStateNode => {
    const outputNode: StockStateNode = {
        name: 'Root',
        value: batchUpdate.values,
        condition: getCondition(batchUpdate, []),
        childNodes: []
    };

    const queue: [obj: unknown, path: string[], parentNode: StockStateNode][] = [[batchUpdate.values, [], outputNode]];

    while (queue.length > 0) {
        const [currentObject, path, currentNode] = queue.shift()!;

        Object.entries(currentObject as object).forEach(([key, value]) => {
            const curPath = path.concat(key);

            const node: StockStateNode = {
                name: key,
                value,
                condition: getCondition(batchUpdate, curPath),
                childNodes: []
            };

            currentNode.childNodes.push(node);

            if (typeof value === 'object' && value !== null) {
                queue.push([value, curPath, node]);
            }
        });
    }

    return outputNode;
};
