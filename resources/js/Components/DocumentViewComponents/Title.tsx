import { Document } from '@/types';
import React, { ChangeEventHandler, FC, KeyboardEventHandler, useRef, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';

interface TitleProps{
    initialData:Document;
}

const Title:FC<TitleProps> = ({initialData}) => {
    const {id} = initialData;
    const [isEditing,setIsEditing] = useState(false);
    const [title,setTitle] = useState(initialData.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const enableInput = () =>{
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0,inputRef.current.value.length);
        },0);
    }

    const disableInput = () => setIsEditing(false);
    const onChange:ChangeEventHandler<HTMLInputElement> = e =>{
        setTitle(e.target.value);
        router.post(route('documents.update',{id}),{
            title:e.target.value||`Koji: ${format(new Date(),'Pp')}`
        },{
            preserveState:true
        });
    }

    const onKeyDown:KeyboardEventHandler<HTMLInputElement> = e =>{
        if (e.key==='Enter') disableInput();
    }

    return (
        <div className='flex items-center gap-x-1'>
            {!!initialData.icon && <p>{initialData.icon}</p>}           
            {isEditing?<Input onClick={enableInput} onBlur={disableInput} onKeyDown={onKeyDown} onChange={onChange} ref={inputRef} value={title} className='h-7 px-2 ' />: <Button onClick={enableInput} variant='ghost' size='sm' className='font-normal h-auto p-1'><span className='truncate'>{initialData.title}</span></Button>}
            
        </div>
    )
}

export default Title