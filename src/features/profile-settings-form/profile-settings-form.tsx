import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import {
  ControlledDatepicker,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'

export const ProfileSettingsForm = () => {
  const { control, handleSubmit } = useProfileSettingsForm()
  const array = [
    { label: 'blr', value: 'blr' },
    { label: 'blr1', value: 'blr1' },
    { label: 'blr2', value: 'blr2' },
    { label: 'blr3', value: 'blr3' },
    { label: 'blr4', value: 'blr4' },
    { label: 'blr5', value: 'blr5' },
  ]
  const handleSubmitHandler = (data: any) => {
    // debugger
    console.log(JSON.stringify({ ...data, dateOfBirth: new Date(data.dateOfBirth).toISOString() }))
    // console.log(data);
  }
  return (
    <form className="w-full flex flex-col gap-6 pt-[24px]"
          onSubmit={handleSubmit(handleSubmitHandler)}
    >
      <ControlledInput control={control} fullWidth label="userName" name="userName" />
      <ControlledInput control={control} fullWidth label="First Name" name="firstName" />
      <ControlledInput control={control} fullWidth label="Last Name" name="lastName" />
      <ControlledDatepicker
        control={control}
        fullWidth
        label="Date of birth"
        name="dateOfBirth"
        startDate={new Date('2000/12/31')}
      />
      <div className="flex gap-[24px]">
        <ControlledInput control={control} fullWidth label="Select your country" name="country" />
        <ControlledInput control={control} fullWidth label="Select your city" name="city" />

        {/*Селект пока не возвращает дату, с этой задачей нам ещё предстоит справиться */}
        {/*<ControlledSelect*/}
        {/*  control={control}*/}
        {/*  label="Select your country"*/}
        {/*  name="country"*/}
        {/*  options={array}*/}
        {/*/>*/}
        {/*<ControlledSelect control={control} label="Select your city" name="city" options={array} />*/}
      </div>
      <ControlledTextarea
        control={control}
        fullWidth
        label="About Me"
        name="aboutMe"
        placeholder="text-area"
      />
      <Button  type={'submit'}>Save Changes</Button>
    </form>
  )
}
