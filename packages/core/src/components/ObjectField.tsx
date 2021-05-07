import { ObjectFieldConfig, ObjectFieldProps, useObjectField } from '../hooks/useObjectField';
import { renderComponent, RenderHelpers } from '../utils/renderComponent';

export type ObjectFieldComponentProps<V extends object> = ObjectFieldConfig<V> & RenderHelpers<ObjectFieldProps<V>>;

export const ObjectField = <V extends object>({ component, children, ...config }: ObjectFieldComponentProps<V>) => {
    const objectFieldBag = useObjectField({ ...config });

    return renderComponent({
        bag: objectFieldBag,
        component,
        children
    });
};
