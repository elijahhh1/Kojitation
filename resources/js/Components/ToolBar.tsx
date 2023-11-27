import { Document, PageProps } from '@/types';
import React, { ElementRef, FC, KeyboardEventHandler, useRef, useState } from 'react'
import IconPicker from './IconPicker';
import { Button } from './ui/button';
import { ImageIcon, Smile, XIcon } from 'lucide-react';
import { router } from '@inertiajs/react';
import RTAUS from 'react-textarea-autosize'
import { toast } from 'sonner';
import { useCoverImageModal } from '@/Hooks/useCoverImageModal';
import { format } from 'date-fns';

interface ToolBarProps{
    initialData:Document;
    preview?:boolean;
}

const ToolBar:FC<ToolBarProps> = ({initialData,preview}) => {
    const {id} = initialData;
    const inputRef = useRef<ElementRef<'textarea'>>(null);
    const [isEditing,setIsEditing] = useState(false);
    const [val,setVal] = useState(initialData.title);
    const {onOpen} = useCoverImageModal();



    const enableInput = () =>{
        if (preview) return;
        setIsEditing(true);
        setTimeout(()=>{
            setVal(initialData.title);
            inputRef.current?.focus();
        },0);
    }

    const disableInput = () =>setIsEditing(false);

    const onInput = (val:string) =>{
        setVal(val);
        router.post(route('documents.update',{id}),{
            title:val||`Gratitude Journal: ${format(new Date(),'Pp')}`
        },{
            preserveState:true
        });
    }

    const onKeyDown:KeyboardEventHandler<HTMLTextAreaElement> = e =>{
        if(e.key==='Enter'){
            e.preventDefault();
            disableInput();
        }
    }

    const onRemoveIcon = () =>{
        router.post(route('documents.remove_icon',{id}),{},{
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        })
    };

    const onSelect=(icon:string)=>{
        router.post(route('documents.update',{id}),{
            icon
        },{
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }

    return (
        <div className='pl-[3.375rem] group relative'>
            {/* {(!preview&&initialData.is_archived==0)&&<p className=' font-semibold tracking-tight text-3xl'>How Are You Feeling Today?</p>} */}
            {
                (!!initialData.icon && !preview) && (
                    <div className='flex items-center gap-x-2 group/icon pt-6'>
                        <IconPicker onSelect={onSelect}>
                            <p className='text-6xl hover:opacity-75 transition'>{initialData.icon}</p>
                        </IconPicker>
                        <Button onClick={onRemoveIcon} className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs' variant='outline' size='icon'>
                            <XIcon className='h-4 w-4' />
                        </Button>
                    </div>
                )
            }
            {(!!initialData.icon && preview)&& <p className='text-6xl pt-6'>{initialData.icon}</p> }
            <div className='opacity-0 group-hover:opacity-100 transition flex items-center gap-x-1 py-3.5'>
                {(!initialData.icon && !preview) && (
                    <IconPicker asChild onSelect={onSelect}>
                        <Button className='text-muted-foreground text-xs' variant='outline' size='sm'> <Smile className='h-4 w-4 mr-2' /> <span>Add Icon</span> </Button>
                    </IconPicker>
                )}

                {(!initialData.cover_image && !preview) &&  <Button onClick={onOpen} className='text-muted-foreground text-xs' variant='outline' size='sm'> <ImageIcon className='h-4 w-4 mr-2' /> <span>Add Cover</span> </Button>}
            </div>
            {
                (isEditing && !preview) ? <RTAUS ref={inputRef} onBlur={disableInput} onKeyDown={onKeyDown} value={val} onChange={({target})=>onInput(target.value)} className='text-5xl bg-transparent font-bold break-words outline-none text-primary/75 resize-none' />:(
                    <div className='pb-[0.719rem] text-4xl font-bold break-words outline-none text-primary/75'>
                        {initialData.title}
                    </div>
                )
            }

        </div>
    )
}

export default ToolBar
