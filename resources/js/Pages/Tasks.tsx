import NewTaskItemModal from '@/Components/Modals/NewTaskItemModal';
import TaskContainer from '@/Components/TaskComponents/TaskContainer';
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Popover, PopoverContent, PopoverTrigger,PopoverClose } from '@/Components/ui/popover';
import DocumentsLayout from '@/Layouts/DocumentsLayout';
import { cn } from '@/lib/utils';
import { PageProps, Task } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CalendarPlus } from 'lucide-react';
import { FC, FormEventHandler, ReactNode, useEffect, useRef } from 'react'
import { toast } from 'sonner';

const Tasks:FC<{tasks:Task[]}> = ({tasks}) => {
    const user = usePage<PageProps>().props.auth.user;
    return (
        <>
            <Head title='Tasks' />
            <DocumentsLayout >
                <div className='h-full flex flex-col relative overflow-hidden'>
                    <header className='flex items-center h-12 border-b border-b-muted-foreground relative'>
                        <h1 className='text-center text-2xl font-semibold tracking-tight flex-1'>{user.name}'s Tasks</h1>
                        <NewTaskList>
                            <Button onClick={()=>{}} size='sm' className='z-[10000000] font-medium text-md flex space-x-2 items-center justify-center absolute top-1 right-1' variant='outline'> 
                                <CalendarPlus className='h-5 w-5' />
                                <span>New Task List</span>
                            </Button>
                        </NewTaskList>
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
            <NewTaskItemModal />
        </>
    )
}

export default Tasks

const NewTaskList:FC<{children:ReactNode}> = ({children}) =>{

    const {post,data,setData,processing,reset} = useForm<{name:string;target_date:Date|undefined}>({
        name:"",
        target_date:undefined
    });
    const close = useRef<HTMLButtonElement>(null);

    const onSelect = (e:Date|undefined) =>{
        if(!e)  return ;
        setData('target_date',e);
        close.current?.click();
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        if(data.name.length<1) return toast.error('Name is Empty');
        if(!data.target_date) return toast.error('Set the Target Date');   
        post(route('tasks.store'),{
            onSuccess:()=>{
                toast.success('Task List Created! Add New Task To the List!');
                reset();
            }
        });
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New List</DialogTitle>
                    <DialogDescription>
                        Create a New Task List.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='form' className='flex flex-col space-y-2.5'>
                    <div>
                        <Label>
                            Task List Name
                        </Label>
                        <Input value={data.name} required onChange={({target})=>setData('name',target.value)} autoComplete='off' disabled={processing} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <Label>
                            Target Date:
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                disabled={processing}
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !data.target_date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.target_date ? format(data.target_date, "PPP") : <span>Pick target date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={data.target_date}
                                    onSelect={onSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                            <PopoverClose ref={close}/>
                        </Popover>
                    </div>
                </form>
                <DialogFooter>
                    <Button disabled={processing} form='form' size='sm' type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}