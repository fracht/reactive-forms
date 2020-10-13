import { RecoilState } from 'recoil';

export interface FieldMeta<V> {
    value: RecoilState<V>;
    rawValue?: RecoilState<V>;
    innerFields: string[];
}
