import React, {FC, FormEventHandler, ReactNode, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { Send, Smile } from 'lucide-react'
import Spinner from '../Spinner'
import IconPicker from '../IconPicker'
import { toast } from 'sonner'

interface MoodModalProps{
    open?:boolean;
    onClose:()=>void;
}

const MoodModal:FC<MoodModalProps> = ({open,onClose}) => {

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

    useEffect(()=>{
        if(!open) reset();
    },[open])

    return (
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
                        <IconPicker asChild onSelect={icon=>setData('icon',icon)}>
                            <Button className='text-muted-foreground text-xs' variant='outline' size='sm'> 
                                
                                <Smile className='h-4 w-4 mr-2' /> <span>{!!data.icon?'Change':'Add'}&nbsp;Icon</span>                                 
                            </Button>
                        </IconPicker>
                        
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
    )
}

export default MoodModal