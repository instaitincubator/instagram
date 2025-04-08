import { getLayout } from "@/app/layouts/mainLayout/Layout"
import { Messanger } from "@/features/messanger/Messanger"

const Messages = () => {
  return <Messanger />
}

Messages.getLayout = getLayout
export default Messages
