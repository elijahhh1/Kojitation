import React, { FC, useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useAuthModal } from '@/Hooks/useAuthModal';
import RegisterModal from '@/Components/Modals/RegisterModal';
import { APP_NAME } from '@/Pages/Welcome';

const Heading:FC = () => {
    const user = usePage<PageProps>().props.auth.user;
    const {onOpen} = useAuthModal();
    const [registerOpen, setRegisterOpen] = useState(false);

    return (
        <div className='absolute z-10 max-w-3xl flex flex-col space-y-3.5'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                    <span className='underline'>{APP_NAME}</span>
                </h1>

                <div className='text-base sm:text-xl md:text-4xl font-medium flex flex-col space-y-1.5'>
                    <p className='font-bold'>Hello</p>
                    <p>we are happy to be with you</p>
                    <p>in your small journey of</p>
                    <p>assessing <span className='font-bold'>stress</span> </p>
                </div>

                {
                    !user?<div className='flex flex-col space-y-2'>
                        <Button variant='outline' onClick={()=>setRegisterOpen(true)} className='bg-blue-200 mx-auto'>Hi! I'm a new user</Button>
                        <a href="#" onClick={onOpen} className='text-sm mx-auto hover:underline'>I already have an account</a>
                        </div>:(
                        <Button onClick={()=>router.get(route('dashboard.index'))} className='mx-auto'>
                            Enter {APP_NAME}
                            <ArrowRight className='h-4 w-4 ml-2' />
                        </Button>
                    )
                }

                <RegisterModal isOpen={registerOpen} onClose={()=>setRegisterOpen(false)} />

        </div>
    )
}

export default Heading
