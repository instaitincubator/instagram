import React from 'react'
import CreatePostt from '@/features/create-post/createPostt'
import { Modal } from '@/shared/ui/Modal/Modal'

const CreatePost = () => {

  return (
    <Modal
      className={'my-[60px] items-stretch justify-start md:items-center  md:justify-center'}
      contentClassName={'items-center block overflow-auto'}
      modalClassName={'bg-transparent border-none'}
      onCloseClassname={'hidden invisible'}
      withOutHeader
      withOutHeaderButtonClassName={'hidden'}
    >
      <CreatePostt />
      {/*<Publish />*/}
    </Modal>
  )
}

export default CreatePost
