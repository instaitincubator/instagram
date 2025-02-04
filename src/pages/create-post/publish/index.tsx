import React from 'react'
import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import Publish from '@/features/create-post/publish/publish'

const PublicationPage = () => {
  return <Publish />
}

PublicationPage.getLayout = getLayoutWithSidebar
export default PublicationPage
