import Logo from '@/Components/Logo';
import AuthModal from '@/Components/Modals/AuthModal';
import { ModeToggle } from '@/Components/ModeToggle';
import UserNav from '@/Components/UserNav';
import { Button } from '@/Components/ui/button';
import { useAuthModal } from '@/Hooks/useAuthModal';
import useScrollTop from '@/Hooks/useScrollTop';
import { APP_NAME } from '@/Pages/Welcome';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { FC, ReactNode, useState } from 'react'

interface Props{
    children:ReactNode;
}

const WelcomeLayout:FC<Props> = ({children}) => {
    return (
        <div className='h-full'>
            <NavBar />
            <main className='h-full pt-32 bg-background '>
                {children}
            </main>
        </div>
    )
}

export default WelcomeLayout


const NavBar:FC = () =>{
    const scrolled = useScrollTop();
    const {onOpen} = useAuthModal();
    const user = usePage<PageProps>().props.auth.user;
    return (
        <>
            <AuthModal />
            <div className={cn('z-50 bg-background fixed top-0 flex items-center w-full p-6',
                scrolled && 'border-b shadow-sm'
                )}>
                <Logo />
                <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
<<<<<<< HEAD
                    {/* {user&&<Button onClick={()=>router.get(route('documents.index'))} variant='ghost'>Enter {APP_NAME}</Button>} */}
=======
                   {/* {user&&<Button onClick={()=>router.get(route('documents.index'))} variant='ghost'>Enter {APP_NAME}</Button>} */}
>>>>>>> d775fe41aac6133927a781ba6866932e07854f97
                    {/* {!user?<Button onClick={onOpen} variant='ghost'>Log In</Button>: <UserNav />} */}
                    <ModeToggle />
                </div>
            </div>
        </>
    );
}
