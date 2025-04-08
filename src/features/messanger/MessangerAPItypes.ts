import { ProfileAvatars } from "@/shared/types/public.types";

  
  export interface ChatMessage {
    id: number;
    ownerId: number;
    receiverId: number;
    messageText: string;
    createdAt: string;
    updatedAt: string;
    messageType: 'TEXT';
    status: 'SENT';
    userName: string;
    avatars: ProfileAvatars[];
  }
  
  export interface GetLatestMessagesResponse {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: ChatMessage[];
  } 
  export interface GetLatestMessagesRequest {
    pageSize: number;
    searchName: string;
    cursor: number;
  }