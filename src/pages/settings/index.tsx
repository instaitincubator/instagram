import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'

const Settings = () => {
  return (
    <div className="flex pl-[24px] pr-[64px] w-full">
      <div className="w-[200px]">avatar here</div>
      <ProfileSettingsForm />
    </div>
  )
}

Settings.getLayout = getLayoutWithSidebar
export default Settings
