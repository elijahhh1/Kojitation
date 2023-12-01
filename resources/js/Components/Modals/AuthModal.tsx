import React, { FC, FormEventHandler, useEffect, useState, ChangeEventHandler,KeyboardEventHandler } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { ArrowRightSquare, EyeIcon, EyeOff, EyeOffIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Spinner from '../Spinner'
import { useAuthModal } from '@/Hooks/useAuthModal'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { cn } from "@/lib/utils"

const AuthModal:FC = () => {

    const {onClose,isOpen} = useAuthModal();

    const {data,setData,processing,errors,reset,post} = useForm({
        email:"",
        password:""
    });

    const [registerOpen, setRegisterOpen] = useState(false);

    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const [viewPassword, setViewPassword] = useState(false)
    const ViewPasswordComponent = () => {
        return(
            <i onClick={()=>setViewPassword((!viewPassword))} className='absolute bottom-2 right-2 cursor-pointer w-6 h-6'>
                <div className='relative'>
                    <EyeIcon className={cn('absolute', viewPassword===true?'':'hidden')} />
                    <EyeOff className={cn('absolute', viewPassword===false?'':'hidden')} />
                </div>
            </i>
        )
    }

    useEffect(()=>{
        if (!isOpen) {
            reset();
            errors.email="";
            errors.password="";
        };
    },[isOpen]);

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('login'),{
            onSuccess:()=>{
                onClose();
                toast.success('Log in successful')
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#E8DFF5] text-gray-900">
                <DialogHeader>
                    <DialogTitle>LOGIN</DialogTitle>
                    <DialogDescription className='dark:text-gray-600'>
                        Enter Login Credentials
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='auth' className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="email" className="text-right">
                            UserName/Email
                        </Label>
                        <Input required value={data.email} onChange={({target})=>setData('email',target.value)} disabled={processing} id="email"
                            className="col-span-3 dark:bg-[#e3cfff]" autoFocus autoComplete='off'/>
                    </div>
                    {errors.email && <p className='text-destructive text-xs text-right -mt-3'>{errors.email}</p>}
                    <div className="relative flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input required type={viewPassword===false?'password':'text'} value={data.password} onChange={({target})=>setData('password',target.value)} disabled={processing} id="password"
                            className="col-span-3 dark:bg-[#e3cfff]" />

                        <ViewPasswordComponent/>
                    </div>
                    {errors.password && <p className='text-destructive text-xs text-right -mt-3'>{errors.password}</p>}
                </form>
                <div className='flex items-center'>
                    <Button onClick={()=>setResetPasswordOpen(true)} variant='link' className='text-sm px-0 text-gray-700' >
                        Forgot Password?
                    </Button>
                    <Button variant='outline' disabled={processing} size='sm' form='auth' type="submit" className='ml-auto dark:bg-[#e3cfff] dark:hover:text-gray-700'>
                        {processing ? <Spinner />: <ArrowRightSquare className='h-5 w-5' /> }
                    </Button>
                </div>
            </DialogContent>

            <ResetPasswordModal open={resetPasswordOpen} onClose={()=>setResetPasswordOpen(false)} />

        </Dialog>
    )
}

export default AuthModal

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

