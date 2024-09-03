import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseCitiesApi = fetchBaseQuery({
  baseUrl: 'http://geodb-free-service.wirefreethought.com/v1',
  // credentials: 'include',
  // prepareHeaders: headers => {
  //   headers.set('X-RapidAPI-Key', '345130cd2fmshad3272bfdb9c40fp1cb541jsn9baa96c0e6fe')
  //   headers.set('x-rapidapi-host', 'wft-geo-db.p.rapidapi.com')
  //
  //   return headers
  // },
})
