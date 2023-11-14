import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useSendFeedbackModal } from '@/Hooks/useSendFeedback'
import { ModeToggle } from '../ModeToggle'
import { APP_NAME } from '@/Pages/Welcome'
import { useFAQModal } from '@/Hooks/useFAQModal'
import { Carousel } from 'react-responsive-carousel'
import { Input } from '../ui/input';
import { Send } from 'lucide-react'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/types';

const SendFeedbackModal:FC = () => {
    const {isOpen,onClose} = useSendFeedbackModal();
    const {sent_feedback_today} = usePage<PageProps>().props;

    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        setLoading(true);
        router.post(route('feedback.store'),{
            message,
        },{
            onSuccess:()=>{console.log("sent")},
            onFinish:()=>setLoading(false)
        })
    }

    useEffect(()=>{
        console.log(sent_feedback_today)
    },);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='flex items-center text-lg font-medium'>
                            <Send className='mr-2'/> 
                            Send Feedback
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {
                    (sent_feedback_today==false)?
                    <>
                        <form onSubmit={onSubmit} id='form' className='flex flex-col space-y-2.5'>
                            <div>
                                <Label>Message</Label>
                                <Input required value={message} onChange={({target})=>setMessage(target.value)} autoComplete='off' disabled={loading} />
                            </div>
                        </form>
                        <DialogFooter>
                            <Button disabled={loading} form='form' size='sm' type="submit">Send</Button>
                        </DialogFooter>
                    </>
                    :
                    <p className='text-center'>Thanks for sending a feedback. You've sent a feedback today!</p>
                }


            </DialogContent>
        </Dialog>
    )
}

export default SendFeedbackModal