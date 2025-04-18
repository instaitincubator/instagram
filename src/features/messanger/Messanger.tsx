import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messenger = () => {
  return (
    <div className="h-full flex flex-col sm:flex-row">
      <div className="hidden sm:flex sm:max-w-[300px]">
        <ChooseChatPanel />
      </div>
      <div className="flex-1">
        <MessageBlock />
      </div>
    </div>
  )
}
