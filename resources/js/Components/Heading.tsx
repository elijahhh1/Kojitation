import React, { ChangeEventHandler, FC, FormEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react'
import { router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useAuthModal } from '@/Hooks/useAuthModal';
import RegisterModal from '@/Components/Modals/RegisterModal';
import { APP_NAME } from '@/Pages/Welcome';
import { Button } from '@/Components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

import { toast } from 'sonner';
import { Label } from './ui/label';
import { Input } from './ui/input';

const Heading:FC = () => {
    const user = usePage<PageProps>().props.auth.user;
    const {onOpen} = useAuthModal();
    const [registerOpen, setRegisterOpen] = useState(false);

    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    return (
        <div className='absolute z-10 max-w-3xl flex flex-col space-y-3.5'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                    <span className='underline'>Kojitation</span>
                </h1>

                <div className='text-base sm:text-xl md:text-4xl font-medium flex flex-col space-y-1.5'>
                    <p className='font-bold'>Hello</p>
                    <p>We are happy to be with you</p>
                    <p>in your small journey of</p>
                    <p>assessing <span className='font-bold'>stress</span> </p>
                </div>

                {
                    !user?(
                        <div className='flex flex-col space-y-2'>
                            <Button variant='outline' onClick={()=>setRegisterOpen(true)} className='bg-blue-200 dark:text-gray-900 mx-auto'>Hi! I'm a new user</Button>
                            <a href="#" onClick={onOpen} className='text-sm mx-auto hover:underline transition duration-300'>I already have an account</a>

                            {/* <Button onClick={()=>setResetPasswordOpen(true)} variant='link' className='text-muted-foreground text-sm italic' >Forgot Password? Click here to reset password</Button> */}
                        </div>
                        ):(
                        <Button onClick={()=>router.get(route('dashboard.index'))} className='mx-auto'>
                            Enter {APP_NAME}
                            <ArrowRight className='h-4 w-4 ml-2' />
                        </Button>
                    )
                }

                <RegisterModal isOpen={registerOpen} onClose={()=>setRegisterOpen(false)} />
                <ResetPasswordModal open={resetPasswordOpen} onClose={()=>setResetPasswordOpen(false)} />
        </div>
    )
}

export default Heading;

interface ResetPasswordModalProps{
    open?:boolean;
    onClose:()=>void;
}

const ResetPasswordModal:FC<ResetPasswordModalProps> = ({open,onClose}) =>{
    const [emailSent,setEmailSent] = useState(false);
    const {data:emailData,setData:setEmailData,processing:processingEmail,errors:emailErrors,post:sendEmail,reset:resetEmailForm} = useForm({email:""})
    const {data,setData,processing,reset,errors,post} = useForm({pin:''})
    const onGerneratePin:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        sendEmail(route('generate'),{
            onSuccess:()=>{
                toast.success('Email Sent. Check your Inbox');
                setEmailSent(true);
            },
            onError:()=>toast.error('Something went Wrong. Please try again')
        });
    }


    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('reset_password'),{
            onError:()=>toast.error('Something went Wrong. Please try again')
        });
    }

    const onChange:ChangeEventHandler<HTMLInputElement> = ({target})=>{
        const val = target.value.replace(/[^0-9]/g, "");
        setData('pin',val);
    }

    const onKeyDown:KeyboardEventHandler<HTMLInputElement> = (e) =>{
        if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
    }

    useEffect(()=>{
        setEmailSent(false);
        reset();
        resetEmailForm();
    },[open])

    return(
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Your Registered Email Address</AlertDialogTitle>
                    <AlertDialogDescription >
                        Click the button below to send 6-digit PIN to your Email Address
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form id='email-form'  onSubmit={onGerneratePin} className='pt-6 pb-3.5 flex flex-col space-y-1'>
                    <div className='flex items-center space-x-1'>
                        <Input autoComplete='off' autoFocus required onChange={({target})=>setEmailData('email',target.value)} disabled={processingEmail || processing} />
                        <Button type='submit' className='font-semibold' disabled={processingEmail || processing}> {processingEmail && <Loader2 className='h-5 w-5 animate-spin' />} {emailSent&&'Re-'}Send{processingEmail&&'ing'} Email</Button>
                    </div>

                    <p className='text-destructive text-sm font-semibold'>{emailErrors.email&&emailErrors.email}</p>
                </form>

                {
                    emailSent&&(
                        <form onSubmit={onSubmit} id='reset-form' className='flex flex-col gap-y-2 items-center'>
                            {errors.pin&&<p className='w-full text-center font-semibold text-destructive '>{errors.pin}</p>}
                            <Label htmlFor='pin'>6 DIGIT PIN</Label>
                            <Input autoComplete='off' placeholder='000000' value={data.pin}  onChange={onChange} onKeyDown={onKeyDown} maxLength={6} required id='pin' className='placeholder:text-muted w-32 border-x-0 border-t-0 border-b-2 !rounded-none text-center text-2xl tracking-widest'/>
                            <Button type='submit' variant='outline'>{processing&&<Loader2 className='h-5 w-5 mr-2 animate-spin' />}Continue</Button>
                        </form>
                    )
                }

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
