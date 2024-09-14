import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { Avatar } from '@/features/avatar/avatar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'

const Settings = () => {
  // flex pl-[24px] pr-[64px] w-full gap-10
  return (
    <div className="flex flex-col items-center md:flex-row md:self-start md:pl-[24px] md:items-start md:pr-[64px] md:w-full md:gap-10">
      <div className="w-[200px] ">
        <Avatar />
      </div>
      <ProfileSettingsForm />
    </div>
  )
}

Settings.getLayout = getLayoutWithSidebar
export default Settings
