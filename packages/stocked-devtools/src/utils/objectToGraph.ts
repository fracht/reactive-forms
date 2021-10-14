import { GraphNode } from '../components/GraphNodeView';

export const objectToGraph = (object: unknown): GraphNode => {
    const outputNode: GraphNode = {
        name: 'Root',
        childNodes: []
    };

    const queue: [obj: unknown, node: GraphNode][] = [[object, outputNode]];

    while (queue.length > 0) {
        const [currentObject, currentNode] = queue.shift()!;

        Object.entries(currentObject as object).forEach(([key, value]) => {
            const node: GraphNode = {
                name: key,
                childNodes: []
            };

            currentNode.childNodes.push(node);

            if (typeof value === 'object' && value !== null) {
                queue.push([value, node]);
            }
        });
    }

    return outputNode;
};
