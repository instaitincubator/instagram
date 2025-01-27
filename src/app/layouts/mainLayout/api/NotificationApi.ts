import {
  GetNotificationResponse,
  MarkAsReadRequest,
  getNotificationParams,
} from '@/app/layouts/mainLayout/types/ApiTypes'
import { baseApi } from '@/services/inctagram-api'

const notificationApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteNotification: build.mutation<void, number>({
        invalidatesTags: ['Notifications'],
        query: id => {
          return {
            method: 'DELETE',
            url: `/api/v1/notifications/${id}`,
          }
        },
      }),
      getNotification: build.query<GetNotificationResponse, getNotificationParams>({
        providesTags: ['Notifications'],
        query: params => {
          return {
            params,
            url: `/api/v1/notifications`,
          }
        },
      }),
      markAsRead: build.mutation<void, MarkAsReadRequest>({
        invalidatesTags: ['Notifications'],
        query: body => {
          return {
            body,
            method: 'PUT',
            url: `/api/v1/notifications/mark-as-read`,
          }
        },
      }),
    }
  },
})

export const { useDeleteNotificationMutation, useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApi
