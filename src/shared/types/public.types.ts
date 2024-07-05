export type Post = {
    avatarOwner: string | undefined
    createdAt: string
    description: string | undefined
    id: number
    images: Images[]
    likesCount: number
    location: string | undefined
    owner: Owner
    ownerId: number
    updatedAt: string
    userName: string
}
export type Images = {
    createdAt: string
    fileSize: number
    height: number
    uploadId: string
    url: string
    width: number
}
export type Owner = {
    firstname: string
    lastname: string
}

export type PostCardProps = {
    openModal: (post: Post) => void
    post: Post
}
export type PostModalProps = {
    onClose: () => void
    post: Post
}
export type PublicPostProps = {
    posts: Post[]
}
export type CountRegisteredUsersProps = {
    count: number | undefined
}