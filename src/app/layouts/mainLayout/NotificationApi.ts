import {
  ErrorResponse,
  GetNotificationResponse,
  MarkAsUpdatedRequest,
  getNotificationParams,
} from '@/app/layouts/mainLayout/ApiTypes'
import { baseApi } from '@/services/inctagram-api'

const notificationApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteNotification: build.mutation<ErrorResponse, number>({
        query: id => {
          return {
            url: `/api/v1/notifications/${id}`,
          }
        },
      }),
      getNotification: build.query<GetNotificationResponse, getNotificationParams>({
        query: params => {
          return {
            params,
            url: `/api/v1/notifications`,
          }
        },
      }),
      markAsUpdated: build.mutation<ErrorResponse, MarkAsUpdatedRequest>({
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
