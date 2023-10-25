import { APP_NAME } from '@/Pages/Welcome'
import { cn } from '@/lib/utils'
import React from 'react'

const Logo = () => {
    return (
        <div className='hidden md:flex items-center gap-x-2'>
            <img src={`${route('welcome')}/images/logo.png`} className='dark:invert' alt="LOGO" height={40} width={40} />
            <p className='font-semibold tracking-tight'>{APP_NAME}</p>
        </div>
    )
}

export default Logo