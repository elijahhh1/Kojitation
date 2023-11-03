import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { router, useForm } from '@inertiajs/react';
import { Button } from '../ui/button';
import { useNewTaskItemModal } from '@/Hooks/useNewTaskItemModal';


const NewTaskItemModal:FC = () => {
    const {isOpen,onClose,task_id} = useNewTaskItemModal();
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        if(!task_id) return;
        setLoading(true);
        router.post(route('task_list.store'),{
            name,
            task_id
        },{
            onSuccess:()=>onClose(),
            onFinish:()=>setLoading(false)
        })
    }

    useEffect(()=>{
        if (!isOpen) setName("");
    },[open]);

    if(!task_id) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Task Item</DialogTitle>
                    <DialogDescription>
                        Create a New Task Item.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='form' className='flex flex-col space-y-2.5'>
                    <div>
                        <Label>
                            Task Item Name
                        </Label>
                        <Input required value={name} onChange={({target})=>setName(target.value)} autoComplete='off' disabled={loading} />
                    </div>
                </form>
                <DialogFooter>
                    <Button disabled={loading} form='form' size='sm' type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewTaskItemModal