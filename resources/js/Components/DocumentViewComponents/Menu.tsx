import { router } from '@inertiajs/react';
import React, { FC } from 'react'
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface MenuProps{
    id:number;
    updateDate:Date;
}

const Menu:FC<MenuProps> = ({id,updateDate}) => {
    const handleArchive = () =>{
        router.post(route('documents.destroy',{id}),{active:true},{
            preserveState:true,
            onSuccess:()=>{
                toast.success('Note Archived');
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant='ghost'><MoreHorizontal className='h-4 w-4' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-60' align='end' alignOffset={8} forceMount>
                <DropdownMenuItem onClick={handleArchive}>
                    <Trash className='h-4 w-4 mr-2' />
                    <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='text-xs text-muted-foreground p-2'>
                    Last Edited: {format(updateDate,'PPpp')}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu