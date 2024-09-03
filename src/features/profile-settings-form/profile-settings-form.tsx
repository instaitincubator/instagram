import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import {
  ControlledDatepicker,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'

export const ProfileSettingsForm = () => {
  const { control } = useProfileSettingsForm()
  const array = [
    { label: 'blr', value: 'blr' },
    { label: 'blr1', value: 'blr1' },
    { label: 'blr2', value: 'blr2' },
    { label: 'blr3', value: 'blr3' },
    { label: 'blr4', value: 'blr4' },
    { label: 'blr5', value: 'blr5' },
  ]

  return (
    <form className="w-full flex flex-col gap-6 pt-[24px]">
      <ControlledInput control={control} fullWidth label="userName" name="userName" />
      <ControlledInput control={control} fullWidth label="First Name" name="firstName" />
      <ControlledInput control={control} fullWidth label="Last Name" name="secondName" />
      <ControlledDatepicker
        control={control}
        fullWidth
        label="Date of birth"
        name="datePicker"
        startDate={new Date('2000/12/31')}
      />
      <div className="flex gap-[24px]">
        <ControlledSelect
          control={control}
          label="Select your country"
          name="country"
          options={array}
        />
        <ControlledSelect control={control} label="Select your city" name="city" options={array} />
      </div>
      <ControlledTextarea
        control={control}
        fullWidth
        label="About Me"
        name="aboutMe"
        placeholder="text-area"
      />
      <Button>Save Changes</Button>
    </form>
  )
}
