import { useEffect, useState } from 'react'

import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import { useGetProfileInfoQuery, usePutSettingsMutation } from '@/services/profile/profileAPi'
import {
  ControlledDatepicker,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { City, Country } from 'country-state-city'

export type DataForm = {
  aboutMe?: string
  city?: Object
  country?: Object
  dateOfBirth?: Date
  firstName: string
  lastName: string
  region?: string
  userName: string
}

export const ProfileSettingsForm = () => {
  const { data: profileInfo, isLoading } = useGetProfileInfoQuery({})
  const { control, defaultValues, handleSubmit, reset, setValue, watch } =
    useProfileSettingsForm(profileInfo)
  const [setSettingsData] = usePutSettingsMutation()

  const countries = Country.getAllCountries()

  const [cities, setCities] = useState<{ label: string; value: string }[]>([])
  const watchCountry = watch('country')
  const watchCity = watch('city')

  useEffect(() => {
    if (profileInfo?.country && watchCountry) {
      const selectCountry = countries.find(el => el.name === profileInfo.country)

      if (selectCountry) {
        const citiesList = City.getCitiesOfCountry(selectCountry.isoCode)

        const transformedCities = transformData(citiesList, 'name', 'name')

        if (transformedCities.length > 0) {
          setCities(transformedCities)
          setValue('city', transformedCities[0]) // Устанавливаем значение для города
        }
      }

      reset({
        aboutMe: profileInfo?.aboutMe,
        city: { label: profileInfo?.city },
        country: { label: profileInfo?.country },
        dateOfBirth: profileInfo?.dateOfBirth,
        firstName: profileInfo?.firstName,
        lastName: profileInfo?.lastName,
        userName: profileInfo?.userName,
      })
    }
  }, [profileInfo, countries])

  // useEffect(() => {
  //   reset({
  //     aboutMe: profileInfo?.aboutMe || '',
  //     city: { label: profileInfo?.city || '' },
  //     country: { label: profileInfo?.country || '' },
  //     dateOfBirth: profileInfo?.dateOfBirth || null,
  //     firstName: profileInfo?.firstName || '',
  //     lastName: profileInfo?.lastName || '',
  //     userName: profileInfo?.userName || '',
  //   })
  // }, [profileInfo, reset])

  useEffect(() => {
    if (watchCountry) {
      const selectedCountry = watchCountry.value

      const citiesList = City.getCitiesOfCountry(selectedCountry)
      const transformedCities = transformData(citiesList, 'name', 'name')

      // console.log(transformedCities)

      setCities(transformedCities)
      setValue('city', transformedCities[0])
    }
  }, [watchCountry])

  const transformData = (data: any, labelKey: string, valueKey: string) => {
    return data.map((item: any) => ({
      label: item[labelKey],
      value: item[valueKey],
    }))
  }

  const allCountries = transformData(countries, 'name', 'isoCode')

  const onSubmit = (data: DataForm) => {
    const transformedData = {
      ...data,
      city: watchCity.label,
      country: watchCountry.label,
      dateOfBirth: data.dateOfBirth?.toISOString(),
    }

    setSettingsData(transformedData)
  }

  return (
    <form className="w-full flex flex-col gap-6 pt-[24px]" onSubmit={handleSubmit(onSubmit)}>
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
        <ControlledSelect
          control={control}
          label="Select your country"
          name="country"
          options={allCountries}
        />
        <ControlledSelect control={control} label="Select your city" name="city" options={cities} />
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
