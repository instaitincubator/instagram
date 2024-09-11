import { useEffect, useState } from 'react'

import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import { ControlledDatepicker, ControlledInput, ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { ControlledCountrySelect } from '@/shared/ui/Controlls/ControlledSelect/ControlledCountrySelect'
import { City, Country } from 'country-state-city'

export const ProfileSettingsForm = () => {
  const { control, handleSubmit, reset, watch } = useProfileSettingsForm()
  const [countryValue, setCountryValue] = useState('')
  const countries = Country.getAllCountries()
  const cities = City.getCitiesOfCountry(countryValue)

  const watchCountry = watch('country')

  useEffect(() => {
    setCountryValue(watchCountry)
    reset({ city: {} })
  }, [watchCountry])

  const allCountries = countries.map(c => {
    return {
      label: c.name,
      value: c.isoCode,
    }
  })
  const allCities = cities?.map(c => {
    return {
      label: c.name,
      value: c.name,
    }
  })

  const onSubmit = (data: any) => {
    handleSubmit(data)
  }

  return (
    <form className="w-full flex flex-col gap-6 pt-[24px]" onSubmit={handleSubmit(onSubmit)}>
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
        <ControlledCountrySelect
          control={control}
          label="Select your country"
          name="country"
          options={allCountries}
          placeholder="country"
        />
        <ControlledCountrySelect
          control={control}
          label="Select your city"
          name="city"
          options={allCities!}
          placeholder="city"
        />
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
