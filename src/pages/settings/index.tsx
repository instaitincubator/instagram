import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { Avatar } from '@/features/avatar/avatar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'
import { useGetProfileQuery } from '@/services/profile/profileApi'
import { Profile } from '@/shared/types/public.types'

const Settings = () => {
  return (
    <div className="flex pl-[24px] pr-[64px] w-full gap-10">
      <div className="w-[200px]">
        <Avatar />
      </div>
      <ProfileSettingsForm />
    </div>
  )
}

Settings.getLayout = getLayoutWithSidebar
export default Settings
