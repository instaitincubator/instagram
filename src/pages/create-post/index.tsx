import React, { useState } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { ReactPhotoEditor, usePhotoEditor } from 'react-photo-editor'
import { Modal } from '@/shared/ui/Modal/Modal'

const CreatePost = () => {
  const [file, setFile] = useState<File | undefined>()

  const { canvasRef, imageSrc } = usePhotoEditor({ file })

  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }
  const deletePic = () => {
    setFile('')
  }
  return (
    <Modal modalClassName={'bg-dark-700'}>
      <input multiple={false} onChange={e => setFileData(e)} type="file" />
      <button onClick={deletePic}>del</button>
      {imageSrc && (
        <canvas
          className={'max-w-[90%] ml-auto mr-auto flex flex-wrap gap-[20px]'}
          ref={canvasRef}
        />
      )}

    </Modal>
  )
}

CreatePost.getLayout = getLayoutWithSidebar
export default CreatePost
