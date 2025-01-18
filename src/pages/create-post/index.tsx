import React, { useState } from "react";

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { ReactPhotoEditor, usePhotoEditor } from "react-photo-editor";

const CreatePost = () => {
  const [file, setFile] = useState<File | undefined>()

  const { canvasRef, imageSrc } = usePhotoEditor({ file })

  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <>
      <input multiple={false} onChange={e => setFileData(e)} type="file" />

      {imageSrc && <canvas ref={canvasRef} />}
    </>
  )
}

CreatePost.getLayout = getLayoutWithSidebar
export default CreatePost
