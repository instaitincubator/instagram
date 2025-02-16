import React from 'react'

import { CreatePost } from '@/features/create-post/createPost'
import { Modal } from '@/shared/ui/Modal/Modal'

const CreatePostPage = () => {
  return (
    <Modal
      className="my-[60px] items-stretch justify-start md:items-center  md:relative md:justify-center"
      contentClassName="items-center block overflow-auto"
      modalClassName="bg-transparent border-none"
      onCloseClassname="hidden invisible"
      withOutHeader
      withOutHeaderButtonClassName="hidden"
    >
      <CreatePost />
      {/*<Publish />*/}
    </Modal>
  )
}

export default CreatePostPage
