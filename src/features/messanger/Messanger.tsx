import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messanger = () => {
  return (
    <div className="h-full flex ">
      <div className="flex-1 sm:max-w-[300px]">
        <ChooseChatPanel />
      </div>
      <div className="flex-1">
        <MessageBlock />
      </div>
    </div>
  )
}
