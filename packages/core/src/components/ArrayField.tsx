import { ArrayFieldConfig, ArrayFieldProps, useArrayField } from '../hooks/useArrayField';
import { renderComponent, RenderHelpers } from '../utils/renderComponent';

export type ArrayFieldComponentProps<V> = ArrayFieldConfig<V> & RenderHelpers<ArrayFieldProps<V>>;

export const ArrayField = <V,>({ children, component, ...config }: ArrayFieldComponentProps<V>) => {
    const arrayBag = useArrayField(config);

    return renderComponent({
        component,
        children,
        bag: arrayBag
    });
};
