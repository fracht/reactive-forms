import { FieldContextConfig, useDefaultFieldContext } from '../hooks/useDefaultFieldContext';
import { FieldContext } from '../typings';
import { renderComponent, RenderHelpers } from '../utils/renderComponent';

export type DefaultFieldContextProps<V> = FieldContextConfig<V> & RenderHelpers<FieldContext<V>>;

export const DefaultFieldContext = <V,>({ component, children, ...config }: DefaultFieldContextProps<V>) => {
    const fieldContext = useDefaultFieldContext(config);

    return renderComponent({
        component,
        children,
        bag: fieldContext
    });
};
