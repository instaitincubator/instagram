import { useState } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const onCloseHandler = () => {
    setIsOpenModal(false)
  }

  return (
    <div>
      {isOpenModal && (
        <Modal onClose={onCloseHandler} title={'модалка'}>
          <div>We have sent a link to confirm your email to (тут будет email)</div>
          <Button className="" onClick={onCloseHandler}>
            OK
          </Button>
        </Modal>
      )}
      <Card className="w-[378px] h-[648px] mx-auto my-auto p-[24px]">
        <h1 className="text-light-100 text-h1 text-center mb-[13px]">Sign Up</h1>

        <div className="flex justify-evenly mb-[24px]">
          <Link href={'https://www.google.com/?client=safari'} target="_blank">
            <Image alt="google-icon" height={36} src="/google.svg" width={36}></Image>
          </Link>
          <Link href={'https://github.com'} target="_blank">
            <Image alt="github-icon" height={36} src="/git.svg" width={36}></Image>
          </Link>
        </div>

        <div className="flex flex-col gap-[20px] mb-[20px]">
          <Input fullWidth label="Username" placeholder="Epam11" />
          <Input fullWidth label="Email" placeholder="Epam@epam.com" />
          <Input fullWidth label="Password" placeholder="******************" />
          <Input fullWidth label="Password confirmation" placeholder="******************" />
        </div>

        <Checkbox
          checked
          className="mb-[22px] text-small ml-[15px]"
          label="I agree to the Terms of Service and Privacy Policy"
        />

        {/*<p className="text-small text-light-100">Test</p>*/}

        <Button className="btn-primary mb-[20px]" fullWidth onClick={() => setIsOpenModal(true)}>
          Sign Up
        </Button>

        <p className="text-light-100 text-center mb-[6px]">Do you have an account?</p>

        <Button fullWidth variant="text">
          Sign In
        </Button>
      </Card>
    </div>
  )
}

SignUp.getLayout = getLayout
// export default SignUp
