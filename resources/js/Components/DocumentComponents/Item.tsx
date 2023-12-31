import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react';
import React, { FC,MouseEventHandler } from 'react'
import { Skeleton } from '../ui/skeleton';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';

interface ItemProps{
    id?:number;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void;
    onClick?:()=>void;
    label:string;
    Icon:LucideIcon;
    updateDate?:Date;
    isDone?:boolean;
    iconColor?:string;
    fontColor?:string;
}

const Item:FC<ItemProps> = ({Icon,label,onClick,id,documentIcon,active,expanded,isSearch,level=0,onExpand,updateDate,isDone,iconColor,fontColor}) => {
    const ChevronIcon = expanded? ChevronDown:ChevronRight;
    const handleExpand:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        onExpand?.();
    }

    const handleCreate:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return;
        router.post(route('documents.store'),{
            title:`Gratitude Journal: ${format(new Date(),'Pp')}`,
            document_id:id
        },{
            onSuccess:()=>{
                if(!expanded) onExpand?.();
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });

    }

    const handleArchive:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return;
        router.post(route('documents.destroy',{id}),{active},{
            preserveState:true,
            onSuccess:()=>{
                toast.success('Note Archived');
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }


    const handleDone:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return;
        router.post(route('documents.update',{id}),{is_done:1},{
            preserveState:true,
            onSuccess:()=>{
                toast.success('TODO is Done!');
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }


    return (
        <div onClick={onClick} role='button'
            style={{ paddingLeft: level >0? `${(level*0.75)+0.75}rem` :'0.75rem' }}
            className={cn('group min-h-[1.688rem] textt-sm py-1  pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium transition ' + fontColor,
                active && 'bg-primary/5 text-primary'
            )}>
            {!!id && <div role='button' className='h-full rounded-sm opacity-70 hover:opacity-100 hover:bg-secondary transition mr-1' onClick={handleExpand}><ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' /></div>}
            {documentIcon?<div className='shrink-0 mr-2 text-[1.125rem]'>{documentIcon}</div>:<Icon className={cn('shrink-0 h-[1.125rem] w-[1.125rem] mr-2 text-muted-foreground ' + iconColor,isDone&&'dark:text-green-400 text-green-500')} />}

            <span className={cn('truncate',isDone&&'dark:text-green-400 text-green-500')}>{label}</span>
            {
                isSearch && (
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[0.625rem] text-muted-foreground'>
                        <span className='text-sm'>CTRL</span>K
                    </kbd>
                )
            }
            {
                !!id && (
                    <div className='ml-auto flex items-center gap-x-1.5'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={e=>e.stopPropagation()}>
                                <div role='button' className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-secondary transition'>
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60' align='start' side='right' forceMount>
                                <DropdownMenuItem onClick={handleDone} className='dark:text-green-400 text-green-500'>
                                    <CheckCircle2 className='h-4 w-4 mr-2' />
                                    <span>Done</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleArchive}>
                                    <Trash className='h-4 w-4 mr-2' />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className='text-xs text-muted-foreground p-2'>
                                    Last Edited: {format(updateDate!,'PPpp')}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div role='button' onClick={handleCreate} className='opacity-0 group-hover:opacity-100 transition h-full ml-auto rounded-sm hover:bg-secondary'>
                            <Plus className='h-4 w-4 text-muted-foreground'/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Item;

