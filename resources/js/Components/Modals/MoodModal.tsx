import React, {FC, FormEventHandler, ReactNode, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react';
import { Send, Smile } from 'lucide-react';
import Spinner from '../Spinner';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface MoodModalProps{
    open?:boolean;
    onClose:()=>void;
}

const MoodModal:FC<MoodModalProps> = ({open,onClose}) => {
    const [showEmojis,setShowEmojis] = useState(false);
    const {post,data,setData,processing  ,reset} = useForm({
        icon:"",
        description:""
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        if(!data.icon||data.icon.length<1||data.icon==="") return toast.error('Select an Icon');
        post(route('mood.store'),{
            onSuccess:onClose
        })
    }

    const onSelect=(icon:string)=>{
        setData('icon',icon);
    }

    useEffect(()=>{
        if(!open) reset();
    },[open]);

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>What is your mood?</DialogTitle>
                        <DialogDescription>
                            How are you feeling right now?
                        </DialogDescription>
                    </DialogHeader>

                        <form onSubmit={onSubmit} id='form' className="flex flex-col space-y-5">
                            {
                                !!data.icon && (
                                    <div className='flex flex-col space-y-0.5 mb-5'>
                                        <p className='font-semibold tracking-tight'>Icon:</p>
                                        <p className='text-6xl text-center'>{data.icon}</p>
                                    </div>
                                )
                            }
                            <EmojiChoices onSelect={onSelect} >
                
                                <Button className='text-muted-foreground text-xs' variant='outline' size='sm' type='button' onClick={()=>setShowEmojis}> 
                                    <Smile className='h-4 w-4 mr-2' /> <span>{!!data.icon?'Change':'Add'}&nbsp;Icon</span>                                 
                                </Button>
                            
                            </EmojiChoices>
                            <div>
                                <Label htmlFor="description" className="text-start">
                                    Describe Mood in detail&nbsp;<span  className='italic text-muted-foreground'>(optional)</span>:
                                </Label>
                                <Input id="description" value={data.description} onChange={({target})=>setData('description',target.value)} placeholder="Feeling hungry..." autoFocus={false} autoComplete='off'/>
                            </div>
                        </form>
                    <DialogFooter>
                        <Button variant='ghost' size='sm' form='form' type="submit">
                            {
                                !processing?<Send className='h-6 w-6'  />:<Spinner size='lg' />
                            }
                            <span className='ml-2'>Go</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
        </>
    )
}

export default MoodModal;


export const emojis=[
    {id:1,icon:'😡'},
    {id:2,icon:'😞'},
    {id:3,icon:'😐'},
    {id:4,icon:'🙂'},
    {id:5,icon:'😄'}
];

interface EmojiChoicesProps{
    // open?:boolean;
    // onClose:()=>void;
    onSelect:(icon:string)=>void;
    children:ReactNode;
}



const EmojiChoices:FC<EmojiChoicesProps> = ({children,onSelect}) =>{
    const handleSelect= (icon:string) =>{
        onSelect(icon);
    }
    return (
        <Popover > 
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent side='right' >
                <p className='w-full font-semibold'>Choose Mood Icon</p>
                <div  className='flex items-center justify-center gap-x-1 '>
                    {emojis.map(({id,icon})=><p role='button' onClick={()=>handleSelect(icon)} key={id} className='text-4xl p-1 text-center '>{icon}</p>)}
                </div>
            </PopoverContent>
        </Popover>
    );
}