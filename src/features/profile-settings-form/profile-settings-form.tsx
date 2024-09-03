import { log } from 'node:util'

import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import { useGetCitiesQuery } from '@/services/cities/citiesApi'
import {
  ControlledDatepicker,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'

export const ProfileSettingsForm = () => {
  const { control, handleSubmit } = useProfileSettingsForm()
  // const { data } = useGetCitiesQuery({})

  // console.log(data)
  const handleSubmitHandler = (data: any) => {
    // debugger
    console.log(JSON.stringify({ ...data, dateOfBirth: new Date(data.dateOfBirth).toISOString() }))
    // console.log(data);
  }

  return (
    <form
      className="w-full flex flex-col gap-6 pt-[24px]"
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
        {/*<ControlledSelect name="country" options={[]} />*/}
      </div>
      <ControlledTextarea
        control={control}
        fullWidth
        label="About Me"
        name="aboutMe"
        placeholder="text-area"
      />
      <Button type={'submit'}>Save Changes</Button>
    </form>
  )
}
