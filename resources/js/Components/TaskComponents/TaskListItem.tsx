import { Task } from '@/types'
import React, { FC, MouseEventHandler, ReactNode, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { CheckCheckIcon, Edit, MoreHorizontal, PlusSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

interface TaskListItem{
    task:Task;
}

const TaskListItem:FC<TaskListItem> = ({task}) => {
    const {id} = task;

    
    const handleShowOptions:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }

    const onDelete = () =>{
        router.post(route('tasks.destroy',{id}),{},{
            onSuccess:()=>toast.success('Task List Deleted!'),
            onError:()=>toast.error('Something went Wrong. Please try again')
        })
    }

    return (
        <>
            <AccordionItem className='w-full' key={task.id} value={task.id.toString()}>
                <AccordionTrigger className='w-full p-1.5 bg-primary-foreground mt-1 rounded-md'>
                    
                    <div className='w-full flex items-center justify-between '>
                        <div className='capitalize font-bold tracking-tight flex items-center space-x-2'>
                            <span>{task.name}</span>
                            <TaskOptions  onFinish={()=>{}} onDelete={onDelete} onRename={()=>{}} >
                                <div onClick={handleShowOptions} role='button' className='border rounded-md p-1 aspect-square hover:opacity-70 transition' >
                                    <MoreHorizontal className="h-4 w-4" />
                                </div>
                            </TaskOptions>
                        </div>
                        <p>Target Date:&nbsp;<span className='font-semibold tracking-tight'>{!!task.target_date&&format(new Date(task.target_date),'PP')}</span></p>
                    </div>
                    
                </AccordionTrigger>
                <AccordionContent className='w-full py-3'>                                   
                    <Button size='sm' variant='outline' className='flex space-x-2.5 items-center justify-center'>
                        <PlusSquare className='h-5 w-5' />
                        <span>Add A New Task</span>
                    </Button>
                </AccordionContent>
            </AccordionItem>
            
            
            
        </>
    )
}

export default TaskListItem;



interface TaskOptionsProps{
    open?:boolean;
    onClose?:()=>void;
    onFinish:()=>void;
    onDelete:()=>void;
    onRename:()=>void;
    children:ReactNode;
}

const TaskOptions:FC<TaskOptionsProps> = ({open,onClose,onFinish,onDelete,onRename,children}) =>{
    const handleCompleted:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.stopPropagation();
    }

    const handleDelete:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.stopPropagation();
        onDelete();
    }

    const handleRename:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.stopPropagation();
    }
    return(
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                {
                    children
                }
                {/* <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='bottom'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleCompleted} className='dark:text-green-400 text-green-500'>
                    <CheckCheckIcon className='h-4 w-4 mr-2' />
                    Completed
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className='text-destructive'> <Trash2 className='mr-2 w-4 h-4' /> Delete Task List</DropdownMenuItem>
                <DropdownMenuItem onClick={handleRename}> <Edit className='h-4 w-4 mr-2' /> Rename</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}