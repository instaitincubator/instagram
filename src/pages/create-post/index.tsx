import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import CreatePost from '@/features/create-post'

const CreatePostLayout = () => {
  return <CreatePost />
}

CreatePostLayout.getLayout = getPublicLayoutWithSidebar
export default CreatePostLayout
