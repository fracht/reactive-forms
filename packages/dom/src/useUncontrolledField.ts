import React, { useEffect, useRef } from 'react';
import { FieldMeta, useFormContext } from '@reactive-forms/core';
import invariant from 'tiny-invariant';

import { LightFieldConfig, LightFieldInputBag, useLightField } from './useLightField';

export type UncontrolledFieldConfig = LightFieldConfig;

export type UncontrolledFieldBag = [
    LightFieldInputBag & {
        ref: React.MutableRefObject<HTMLInputElement | undefined>;
    },
    FieldMeta<string>
];

export const useUncontrolledField = (config: UncontrolledFieldConfig): UncontrolledFieldBag => {
    const [inputBag, fieldMeta] = useLightField(config);
    const { registerPostprocessor } = useFormContext();

    const inputRef = useRef<HTMLInputElement>();

    useEffect(
        () =>
            registerPostprocessor<string>({
                path: config.name,
                update: () => {
                    invariant(inputRef.current, 'Failed to get value from field: inputRef was not passed into input.');

                    return inputRef.current.value;
                }
            }),
        [config.name, registerPostprocessor]
    );

    return [
        {
            ...inputBag,
            ref: inputRef
        },
        fieldMeta
    ];
};
