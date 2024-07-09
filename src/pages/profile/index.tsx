import { getLayout } from '@/app/layouts/mainLayout/Layout'
import {DatePicker} from '@/shared/ui/DatePicker';

const Profile = () => {
  return <div>
    <DatePicker></DatePicker>
  </div>
}

Profile.getLayout = getLayout
export default Profile
