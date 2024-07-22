import { ComponentType, ReactElement, useEffect } from 'react'

import { useAppSelector } from '@/app/store'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P): ReactElement | null => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const router = useRouter()

    // Проверяем состояние авторизации пользователя
    // Если пользователь не авторизован, перенаправляем на страницу входа
    useEffect(() => {
      if (!isAuth) {
        router.push('/login') // Замените '/login' на путь к вашей странице входа
      }
    }, [isAuth, router])

    // Если пользователь авторизован, отрисовываем обернутый компонент
    if (isAuth) {
      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth
