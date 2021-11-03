export type StockInfo = {
    id: number;
    name: string;
    stateHistory: StockStateNode[];
};

export enum NodeCondition {
    IDLE,
    HIGHLIGHT,
    ORIGIN
}

export type StockStateNode = {
    value: unknown;
    name: string;
    condition: NodeCondition;
    childNodes: StockStateNode[];
};
