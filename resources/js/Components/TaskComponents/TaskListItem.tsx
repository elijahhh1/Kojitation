import { Task } from '@/types'
import React, { FC, MouseEventHandler, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { CheckCheckIcon, Edit, MoreHorizontal, PlusSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';

interface TaskListItem{
    task:Task;
}

const TaskListItem:FC<TaskListItem> = ({task}) => {
    

    const [showOption,setShowOptions] = useState(false);
    const handleShowOptions:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setShowOptions(true);
    }
    return (
        <>
            <AccordionItem className='w-full' key={task.id} value={task.id.toString()}>
                <AccordionTrigger className='w-full p-1.5 bg-primary-foreground mt-1 rounded-md'>
                    <div className='w-full flex items-center md:justify-between '>
                        <div className='capitalize font-bold tracking-tight flex items-center space-x-2'>
                            <span>{task.name}</span>
                            <div onClick={handleShowOptions} role='button' className='border rounded-md p-1 aspect-square hover:opacity-70 transition' >
                                <MoreHorizontal className="h-4 w-4" />
                            </div>
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
            
            <TaskOptions open={showOption} onClose={()=>setShowOptions(false)} onFinish={()=>{}} onDelete={()=>{}} onRename={()=>{}} />
        </>
    )
}

export default TaskListItem;



interface TaskOptionsProps{
    open?:boolean;
    onClose:()=>void;
    onFinish:()=>void;
    onDelete:()=>void;
    onRename:()=>void;
}

const TaskOptions:FC<TaskOptionsProps> = ({open,onClose,onFinish,onDelete,onRename}) =>{
    return(
        <DropdownMenu open={open} onOpenChange={onClose}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side='right'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {}} className='dark:text-green-400 text-green-500'>
                    <CheckCheckIcon className='h-4 w-4 mr-2' />
                    Finish Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-destructive'> <Trash2 className='mr-2 w-4 h-4' /> Delete Task List</DropdownMenuItem>
                <DropdownMenuItem> <Edit className='h-4 w-4 mr-2' /> Rename</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}