import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {Input} from '@/shared/ui/Input/Input';
import {ComponentPropsWithoutRef} from 'react';


 type InputProps = {
    checked?: boolean
    className?: string
    disabled?: boolean
    error?: string
    fullWidth?: boolean
    label?: string
    onChangeText?: (value: string) => void
    placeholder?: string
    type?: string
} & ComponentPropsWithoutRef<'input'>


export type ControlledTextFieldProps<TFieldValues extends FieldValues> =
    UseControllerProps<TFieldValues> & Omit<InputProps, 'onChange' | 'value'>

export const ControlledInput = <TFieldValues extends FieldValues>({
                                                                          name,
                                                                          rules,
                                                                          shouldUnregister,
                                                                          control,
                                                                          ...textFieldProps
                                                                      }: ControlledTextFieldProps<TFieldValues>) => {
    const {
        field: { onChange, value },
    } = useController({
        name,
        control,
        shouldUnregister,
        rules,
    })

    return (
        <Input
            {...{
                onChange,
                value,
                ...textFieldProps,
            }}
        />
    )
}