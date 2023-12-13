import { Task } from '@/types'
import React, { FC, FormEventHandler, MouseEventHandler, ReactNode, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Check, CheckCheckIcon, Edit, Loader2, MoreHorizontal, PlusSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { useNewTaskItemModal } from '@/Hooks/useNewTaskItemModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TaskItem from './TaskItem';

interface TaskListItem{
    task:Task;
}

const TaskListItem:FC<TaskListItem> = ({task}) => {
    const {onOpen} = useNewTaskItemModal();
    const {id,task_items} = task;


    const {data,setData,processing,reset,post} = useForm({
        name:task.name
    });

    const [renaming,setRenaming] = useState(false);


    const handleShowOptions:MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }

    const onDelete = () =>{
        router.post(route('tasks.destroy',{id}),{},{
            onSuccess:()=>toast.success('Task List Deleted!'),
            onError:()=>toast.error('Something went Wrong. Please try again')
        });
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('tasks.update',{id}),{
            onSuccess:()=>{
                toast.success('Task List Renamed!');
                setRenaming(false);
            },
            onError:()=>toast.error('Something went Wrong. Please try again')
        });
    }

    return (
        <>
            <AccordionItem className='w-full dark:bg-zinc-800 rounded shadow my-4' key={task.id} value={task.id.toString()}>
                <AccordionTrigger className='w-full bg-gray-200 dark:bg-zinc-600 rounded-tl rounded-tr p-4'>

                    <div className='w-full flex items-center justify-between '>
                        <div className='capitalize font-bold tracking-tight flex items-center space-x-2'>
                            {
                                renaming?(
                                    <form onClick={e=>e.preventDefault()} onSubmit={onSubmit} className='flex flex-row items-center space-x-1.5'>
                                        <Input value={data.name} onChange={({target})=>setData('name',target.value)} disabled={processing} autoComplete='off' />
                                        <Button asChild type='submit' disabled={processing}>
                                            Rename
                                        </Button>
                                    </form>
                                ):(
                                    <>
                                        <TaskOptions  onFinish={()=>{}} onDelete={onDelete} onRename={()=>setRenaming(true)} >
                                            <div onClick={handleShowOptions} role='button' className='border rounded-md p-1 aspect-square hover:opacity-70 transition' >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </div>
                                        </TaskOptions>
                                        <span>{task.name}</span>
                                    </>
                                )
                            }

                        </div>
                        <p className='text-sm'>Target Date:&nbsp;<span className=''>{!!task.target_date&&format(new Date(task.target_date),'PP')}</span></p>
                    </div>

                </AccordionTrigger>
                <AccordionContent className='w-full pb-0'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className='w-96'>Task Item</TableHead>
                            <TableHead >Status</TableHead>
                            <TableHead>Completed Date</TableHead>
                            <TableHead className='hidden text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                task_items.map(item=><TaskItem key={item.id} item={item} />)
                            }
                        </TableBody>
                    </Table>
                    <Button onClick={()=>onOpen(id)} size='sm' className='bg-gradient-to-r from-cyan-500 to-blue-500 flex space-x-2.5 items-center justify-center mt-4'>
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
        onRename();
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
                {/* <DropdownMenuItem onClick={handleCompleted} className='dark:text-green-400 text-green-500'>
                    <CheckCheckIcon className='h-4 w-4 mr-2' />
                    Completed
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className='text-destructive'> <Trash2 className='mr-2 w-4 h-4' /> Delete Task List</DropdownMenuItem>
                <DropdownMenuItem onClick={handleRename}> <Edit className='h-4 w-4 mr-2' /> Rename</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
