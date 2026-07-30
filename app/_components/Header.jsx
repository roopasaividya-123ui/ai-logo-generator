import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from "react"

function Header() {
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px56 py-4 flex justify-between items-center'>
        <Image src={"/logo.svg"} alt="AI Logo" width={180} height={100} />
        <Button>Get Started</Button>
    </div>
  )
}

export default Header