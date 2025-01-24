import { GetNotificationResponse } from '@/app/layouts/mainLayout/ApiTypes'
import { baseApi } from '@/services/inctagram-api'

const notificationApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteNotification: build.mutation({
        query: id => {
          return {
            url: `/api/v1/notifications/${id}`,
          }
        },
      }),
      getNotification: build.query<GetNotificationResponse, any>({
        query: () => {
          return {
            url: '/api/v1/notifications',
          }
        },
      }),
      markAsUpdated: build.mutation({
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

export const { useDeleteNotificationMutation, useGetNotificationQuery, useMarkAsUpdatedMutation } =
  notificationApi
