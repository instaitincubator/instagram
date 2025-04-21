import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { Messanger } from '@/features/messanger/Messanger'

const Messages = () => {
  return (
    <div className="h-full">
      <Messanger />
    </div>
  )
}

Messages.getLayout = getPublicLayoutWithSidebar
export default Messages
