import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useGetCitiesQuery } from '@/services/cities/citiesApi'

const Statistics = () => {
  const { data: cities } = useGetCitiesQuery({})

  console.log(cities)

  return <div>Statistics</div>
}

Statistics.getLayout = getLayout
export default Statistics
