import React from 'react'

import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { Publish } from '@/features/create-post/ul/publish/publish'

const PublicationPage = () => {
  return <Publish />
}

PublicationPage.getLayout = getPublicLayoutWithSidebar
export default PublicationPage
