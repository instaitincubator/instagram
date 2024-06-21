import React, { useEffect } from 'react'
import { ChangeHandler, RefCallBack } from 'react-hook-form'

import config from '../../../../config'

interface Props {
  name: 'captcha'
  onBlur: ChangeHandler
  onChange: ChangeHandler
  ref: RefCallBack
  theme?: 'dark' | 'light'
}

export const Recaptcha = ({ theme = 'dark', ...rest }: Props) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const recaptchaResponse = (window as any).grecaptcha.getResponse()

    console.log(recaptchaResponse)
  }

  return (
    <div
      {...rest}
      className="g-recaptcha"
      data-callback={handleFormSubmit}
      data-sitekey={config.captchaKey}
      data-theme={theme}
    ></div>
  )
}
