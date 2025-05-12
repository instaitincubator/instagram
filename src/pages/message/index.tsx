import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { Messenger } from '@/features/messanger/Messanger'

const Messages = () => {
  return (
    <div className="h-full">
      <Messenger />
    </div>
  )
}

Messages.getLayout = getPublicLayoutWithSidebar
export default Messages
