import React, { FC } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useAuthModal } from '@/Hooks/useAuthModal';
import { APP_NAME } from '@/Pages/Welcome';

const Heading:FC = () => {
    const user = usePage<PageProps>().props.auth.user;
    const {onOpen} =useAuthModal();
    return (
        <div className='max-w-3xl flex flex-col space-y-3.5'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                    <span className='underline'>{APP_NAME}</span>
                </h1>
                <div className='text-base sm:text-xl md:text-2xl font-medium flex flex-col space-y-1.5'>
                    <p className='font-bold'>Hello</p>
                    <p>we are happy to be with you</p>
                    <p>in your small journey of</p>
                    <p>assessing <span className='font-bold'>stress</span> </p>
                </div>
                {
                    !user?<Button variant='outline' onClick={onOpen} className='mx-auto'>Log In In Order to Access {APP_NAME}</Button>:(
                        <Button onClick={()=>router.get(route('documents.index'))} className='mx-auto'>
                            Enter {APP_NAME}
                            <ArrowRight className='h-4 w-4 ml-2' />
                        </Button>
                    )   
                }
                
        </div>
    )
}

export default Heading