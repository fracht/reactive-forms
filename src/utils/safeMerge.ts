import merge from 'lodash/merge';

export const safeMerge = <TObject, TSource>(obj: TObject, source: TSource): (TObject & TSource) | TObject | TSource => {
    if (typeof obj === 'object' && typeof source === 'object') return merge(obj, source);
    if (typeof obj === 'object') return obj;
    return source;
};
