import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { Messenger } from '@/features/messanger/Messanger'

const MessagesIndex = () => {
  return (
    <div className="h-full overflow-hidden">
      <Messenger />
    </div>
  )
}

MessagesIndex.getLayout = getPublicLayoutWithSidebar
export default MessagesIndex
