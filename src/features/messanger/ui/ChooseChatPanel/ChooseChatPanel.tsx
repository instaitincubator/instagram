import { useGetLatestMessagesQuery } from "@/features/messanger/Messanger-API"

export const ChooseChatPanel = () => {
    const {data, isLoading} = useGetLatestMessagesQuery({
        pageSize: 10,
        searchName: '',
        cursor: 0
    })
    return <div>
        {data?.items.map((item) => (
            <div key={item.id}>
                <div>{item.userName}</div>
                <div>{item.messageText}</div>
            </div>
        ))}
    </div>
  }