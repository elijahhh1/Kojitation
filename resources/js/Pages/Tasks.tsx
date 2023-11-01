import TaskContainer from '@/Components/TaskComponents/TaskContainer';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DocumentsLayout from '@/Layouts/DocumentsLayout';
import { PageProps, Task } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CalendarPlus } from 'lucide-react';
import { FC, ReactNode } from 'react'

const Tasks:FC<{tasks:Task[]}> = ({tasks}) => {
    const user = usePage<PageProps>().props.auth.user;
    return (
        <>
            <Head title='Tasks' />
            <DocumentsLayout >
                <div className='h-full flex flex-col relative overflow-hidden'>
                    <header className='flex items-center h-12 border-b border-b-muted-foreground relative'>
                        <h1 className='text-center text-2xl font-semibold tracking-tight flex-1'>{user.name}'s Tasks</h1>
                        <Button onClick={()=>{}} size='sm' className='font-medium text-md flex space-x-2 items-center justify-center absolute top-1 right-1' variant='outline'> 
                            <CalendarPlus className='h-5 w-5' />
                            <span>New Task List</span>
                        </Button>
                    </header>
                    {
                        tasks.length>0 ? <TaskContainer className='flex-1 overflow-y-auto' tasks={tasks} />:(
                            <p className='pt-20 w-full text-center text-3xl font-semibold tracking-tight'>
                                No Tasks...
                            </p>
                        )
                    }
                </div>
            </DocumentsLayout>
        </>
    )
}

export default Tasks

const NewTaskList:FC<{children:ReactNode}> = ({children}) =>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-2.5'>
                    
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}