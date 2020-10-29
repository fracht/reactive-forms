import { TextFieldConfig, TextFieldProps, useTextField } from '../hooks';
import { renderComponent, RenderHelpers } from '../utils/renderComponent';

export type TextFieldComponentProps = TextFieldConfig & RenderHelpers<TextFieldProps>;

export const TextField = ({
    name,
    onChange,
    onBlur,
    validator,
    schema,
    component,
    children
}: TextFieldComponentProps) => {
    const fieldBag = useTextField({ name, onChange, onBlur, validator, schema });

    const { field } = fieldBag;

    return renderComponent({
        component,
        children,
        defaultComponent: 'input',
        bag: fieldBag,
        elementComponentProps: field
    });
};
