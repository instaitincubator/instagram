import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import CreatePost from '@/features/create-post'

const CreatePostLayout = () => {
  return <CreatePost />
}

CreatePostLayout.getLayout = getLayoutWithSidebar
export default CreatePostLayout
