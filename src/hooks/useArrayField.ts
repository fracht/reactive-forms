import { FieldContextProps, useDefaultFieldContext } from './useDefaultFieldContext';
import { MorfixErrors, MorfixTouched } from '../typings';
import { useRefCallback } from '../utils/useRefCallback';

export type ArrayConfig<V> = FieldContextProps<Array<V>>;

export type ArrayFieldProps<V> = {
    items: Array<V>;
    errors?: MorfixErrors<Array<V>>;
    touched?: MorfixTouched<Array<V>>;
    setItem: (item: V, index: number) => void;
    setItems: (items: Array<V>) => void;
    push: Array<V>['push'];
    pop: Array<V>['pop'];
    shift: Array<V>['shift'];
    unshift: Array<V>['unshift'];
    swap: (firstIndex: number, secondIndex: number) => void;
    move: (from: number, to: number) => void;
    insert: (index: number, value: V) => void;
    removeAt: (index: number) => void;
};

export const useArrayField = <V>({ ...fieldContextConfig }: ArrayConfig<V>): ArrayFieldProps<V> => {
    const {
        value: items,
        control: { setValue: setItems, setError: setErrors, setTouched },
        meta: { error: errors, touched }
    } = useDefaultFieldContext<Array<V>>(fieldContextConfig);

    const updateArray = <Output>(
        update: <T>(oldItems: Array<T>) => [Array<T>, Output],
        updateErrors: boolean | ((oldItems: MorfixErrors<Array<V>>) => Array<MorfixErrors<V>>),
        updateTouched: boolean | ((oldItems: MorfixTouched<Array<V>>) => Array<MorfixTouched<V>>)
    ): Output => {
        const [newItems, output] = update(items);

        setItems(newItems);

        if (updateErrors && errors) {
            setErrors(typeof updateErrors === 'function' ? updateErrors(errors) : update(errors)[0]);
        }

        if (updateTouched && touched) {
            setTouched(typeof updateTouched === 'function' ? updateTouched(touched) : update(touched)[0]);
        }

        return output;
    };

    const setItem = useRefCallback((item: V, index: number) =>
        updateArray(
            <T>(items: Array<T>) => {
                items[index] = (item as unknown) as T;
                return [items, undefined];
            },
            false,
            false
        )
    );

    const push = useRefCallback((...newItems: Array<V>) =>
        updateArray(
            <T>(oldItems: Array<T>) => {
                const size = oldItems.push(...((newItems as unknown) as Array<T>));
                return [oldItems, size];
            },
            false,
            false
        )
    );

    const pop = useRefCallback(() =>
        updateArray(
            <T>(oldItems: Array<T>) => {
                const output = oldItems.pop();
                return [oldItems, output as V | undefined];
            },
            true,
            true
        )
    );

    const removeAt = useRefCallback((index: number) =>
        updateArray(
            (items) => {
                items.splice(index, 1);
                return [items, undefined];
            },
            true,
            true
        )
    );

    const swap = useRefCallback((first: number, second: number) =>
        updateArray(
            (items) => {
                const a = items[first];
                items[first] = items[second];
                items[second] = a;
                return [items, undefined];
            },
            true,
            true
        )
    );

    const shift = useRefCallback(() =>
        updateArray(
            (items) => {
                const shiftedItem = items.shift();
                return [items, shiftedItem as V | undefined];
            },
            true,
            true
        )
    );

    const unshift = useRefCallback((newItem: V) =>
        updateArray(
            <T>(items: Array<T>) => {
                const newArrayLength = items.unshift((newItem as unknown) as T);
                return [items, newArrayLength];
            },
            (oldErrors) => {
                oldErrors.unshift({} as MorfixErrors<V>);
                return oldErrors;
            },
            (oldTouched) => {
                oldTouched.unshift({} as MorfixTouched<V>);
                return oldTouched;
            }
        )
    );

    const move = useRefCallback((from: number, to: number) =>
        updateArray(
            (items) => {
                const item = items[from];
                items.splice(from, 1);
                items.splice(to, 0, item);
                return [items, undefined];
            },
            true,
            true
        )
    );

    const insert = useRefCallback((index: number, value: V) =>
        updateArray(
            <T>(items: Array<T>) => {
                items.splice(index, 0, (value as unknown) as T);
                return [items, undefined];
            },
            (oldErrors) => {
                oldErrors.splice(index, 0, {} as MorfixErrors<V>);
                return oldErrors;
            },
            (oldTouched) => {
                oldTouched.splice(index, 0, {} as MorfixTouched<V>);
                return oldTouched;
            }
        )
    );

    return {
        items,
        setItems,
        setItem,
        push,
        pop,
        removeAt,
        swap,
        shift,
        unshift,
        move,
        insert,
        errors,
        touched
    };
};
