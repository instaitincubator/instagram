import {FieldValues, useController, UseControllerProps} from 'react-hook-form'
import {Checkbox, CheckboxProps} from '@/shared/ui/Checkbox/Checkbox';


type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<CheckboxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
                                                              name,
                                                              control,
                                                              ...restProps
                                                          }: ControlledInputProps<T>): JSX.Element => {
    const {
        field: {value, onChange},
    } = useController({
        name,
        control,
    })

    return <Checkbox value={value} onChange={onChange} {...restProps} />
}