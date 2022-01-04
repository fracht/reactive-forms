import { ChangeEvent, FocusEvent } from 'react';
import {
    FieldError,
    FieldMeta,
    FieldTouched,
    FieldValidationProps,
    useFieldValidator,
    useFormContext,
    usePluginAssertion
} from '@reactive-forms/core';
import { Pxth, pxthToString } from 'pxth';
import { useStockValue } from 'stocked';

import { domPlugin } from '.';

export type LightFieldConfig = {
    name: Pxth<string>;
} & FieldValidationProps<string>;

export type LightFieldBag = [LightFieldInputBag, FieldMeta<string>];

export type LightFieldInputBag = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    name: string;
};

export const useLightField = ({ name, schema, validator }: LightFieldConfig): LightFieldBag => {
    usePluginAssertion(domPlugin, 'Dom plugin is required to use text field');

    useFieldValidator({ name, schema, validator });

    const { handleChange, handleBlur, errors, touched } = useFormContext();

    const error = useStockValue<FieldError<string>>(name as unknown as Pxth<FieldError<string>>, errors);
    const fieldTouched = useStockValue<FieldTouched<string>>(name as unknown as Pxth<FieldTouched<string>>, touched);

    return [
        {
            onChange: handleChange,
            onBlur: handleBlur,
            name: pxthToString(name) as string
        },
        {
            error,
            touched: fieldTouched
        }
    ];
};
