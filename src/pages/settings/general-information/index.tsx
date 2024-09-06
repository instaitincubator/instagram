import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'

const GeneralInformation = () => {
  return (
    <div className="flex w-full">
      <div className="w-[200px]">avatar here</div>
      <ProfileSettingsForm />
    </div>
  )
}

GeneralInformation.getLayout = getSettingsLayout
export default GeneralInformation
