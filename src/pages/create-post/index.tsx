import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import CreatePost from '@/features/create-post/createPost'

const CreatePostLayout = () => {
  return <CreatePost />
}

CreatePostLayout.getLayout = getLayoutWithSidebar
export default CreatePostLayout
