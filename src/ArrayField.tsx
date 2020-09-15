import { SharedFieldConfig } from './types';
import { useDefaultFieldContext } from './DefaultFieldContext';

export interface ArrayFieldConfig extends SharedFieldConfig {}

export interface ArrayFieldProps<T> {
    items: Array<T>;
    push: Array<T>['push'];
    pop: Array<T>['pop'];
    remove: (index: number) => T | undefined;
    set: (item: T, index: number) => void;
    setAll: (items: Array<T>) => void;
}

const actionWithCallback = <T extends (...args: unknown[]) => unknown>(
    action: T,
    callback: (output: ReturnType<T>) => void
) => (...args: Parameters<T>) => {
    const output: ReturnType<T> = action(...args) as ReturnType<T>;
    callback(output as ReturnType<T>);
    return output;
};

export const useArrayField = <T,>({
    name
}: ArrayFieldConfig): ArrayFieldProps<T> => {
    const [{ value: items }, { setValue }] = useDefaultFieldContext<T[]>(name);

    const setAll = (items: Array<T>) => setValue(items);

    const update = () => setAll(items);

    return {
        items,
        push: actionWithCallback(Array.prototype.push.bind(items), update),
        pop: actionWithCallback(Array.prototype.pop.bind(items), update),
        set: actionWithCallback(
            (item: T, index: number) => (items[index] = item),
            update
        ),
        remove: (index: number) => {
            const output = items.splice(index, 1);
            update();
            if (output?.length > 0) return output[0];
            return undefined;
        },
        setAll
    };
};

export const ArrayField = <T,>(
    config: ArrayFieldConfig & {
        children: (props: ArrayFieldProps<T>) => React.ReactElement;
    }
) => {
    const field = useArrayField<T>(config);
    const { children } = config;
    return children(field);
};
