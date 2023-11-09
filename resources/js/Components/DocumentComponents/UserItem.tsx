import { Avatar } from '@radix-ui/react-avatar'

import React from 'react'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronsLeftRight, ChevronDown } from 'lucide-react'
import { APP_NAME } from '../../Pages/Welcome';

const UserItem = () => {
    const user = usePage<PageProps>().props.auth.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role='button' className='flex items-center text-sm p-2.5 w-full hover:bg-primary/5'>
                    <div className=' gap-x-1.5 flex items-center max-w-[9.375rem]'>
                        {/* <Avatar className='h-5 w-5'>
                            <AvatarImage src="" alt="@shadcn" />
                            <AvatarFallback className='bg-background'>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar> */}
                        <span className='text-lg text-start font-medium line-clamp-1'>
                            {APP_NAME}
                        </span>
                    </div>
                    <ChevronDown className='ml-2 text-muted-foreground h-4 w-4' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-primary">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>router.post(route('logout'))}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserItem
