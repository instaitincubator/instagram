import {FieldValues, useController, UseControllerProps} from 'react-hook-form'

import Select from '@/shared/ui/Select/Select';
import {SelectProps} from '@/shared/ui/Select/types';


export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
    UseControllerProps<TFieldValues> & Omit<SelectProps, 'onChange' | 'value'>
export const ControlledSelect = <TFieldValues extends FieldValues>({
                                                                       name,
                                                                       rules,
                                                                       shouldUnregister,
                                                                       control,
                                                                       options,
                                                                       ...selectProps
                                                                   }: ControlledCheckboxProps<TFieldValues>) => {
    const {
        field: {onChange, value},
    } = useController({
        name,
        rules,
        shouldUnregister,
        control,
    })

    return (
        <Select
            options={options}
            onChange={onChange}
            value={value}
            {...selectProps}
        />
    )
}
