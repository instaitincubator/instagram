import React from 'react'

import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { HomePage } from '@/features/home/home'

export default function Home() {
  return <HomePage />
}

Home.getLayout = getPublicLayoutWithSidebar
