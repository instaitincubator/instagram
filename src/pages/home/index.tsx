import React from 'react'

import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import PostModal from '@/entities/Post/PostModal'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async ({ query }) => {
  const res = await fetch(`https://inctagram.work/api/v1/public-posts/${query?.id}`)
  const post: any = await res.json()

  return { props: { post } }
}) satisfies GetServerSideProps<{ post: any }>

export default function Home({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <PostModal onClose={() => {}} post={post} />
    </div>
  )
}

Home.getLayout = getPublicLayoutWithSidebar
