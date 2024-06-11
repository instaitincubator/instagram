import { useEffect, useState } from 'react'

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      handleResize() // Проверяем начальный размер окна
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
