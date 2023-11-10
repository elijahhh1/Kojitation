import React, { ChangeEventHandler, FC, FormEventHandler, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react'
import { router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useAuthModal } from '@/Hooks/useAuthModal';
import RegisterModal from '@/Components/Modals/RegisterModal';
import { APP_NAME } from '@/Pages/Welcome';
import { Button } from '@/Components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { toast } from 'sonner';

const Heading:FC = () => {
    const user = usePage<PageProps>().props.auth.user;
    const {onOpen} = useAuthModal();
    const [registerOpen, setRegisterOpen] = useState(false);
    
    const [resetPasswordOpen, SetResetPasswordOpen] = useState(false);

    return (
        <div className='absolute z-10 max-w-3xl flex flex-col space-y-3.5'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                    <span className='underline'>{APP_NAME}</span>
                </h1>

                <div className='text-base sm:text-xl md:text-4xl font-medium flex flex-col space-y-1.5'>
                    <p className='font-bold'>Hello</p>
                    <p>we are happy to be with you</p>
                    <p>in your small journey of</p>
                    <p>assessing <span className='font-bold'>stress</span> </p>
                </div>

                {
                    !user?(
                        <div className='flex flex-col space-y-2'>
                            <Button variant='outline' onClick={()=>setRegisterOpen(true)} className='bg-blue-200 mx-auto'>Hi! I'm a new user</Button>
                            <a href="#" onClick={onOpen} className='text-sm mx-auto hover:underline transition duration-300'>I already have an account</a>
                            <Button onClick={()=>SetResetPasswordOpen(true)} variant='link' className='text-xs text-muted-foreground leading-10 italic'>Forgot Password?</Button>
                        </div>
                        ):(
                        <Button onClick={()=>router.get(route('dashboard.index'))} className='mx-auto'>
                            Enter {APP_NAME}
                            <ArrowRight className='h-4 w-4 ml-2' />
                        </Button>
                    )
                }

                <RegisterModal isOpen={registerOpen} onClose={()=>setRegisterOpen(false)} />
                <ForgotPasswordModal open={resetPasswordOpen} onClose={()=>SetResetPasswordOpen(false)} />
        </div>
    )
}

export default Heading;


const ForgotPasswordModal:FC<{open?:boolean;onClose:()=>void}> = ({open,onClose}) =>{

    const {data,setData,errors,reset,processing,post} = useForm({
        email:"",
        user_name:"",
        password:"",
        password_confirmation:""
    });

    const {email,
        user_name,
        password,
        password_confirmation
    } = data;

    const handleChange:ChangeEventHandler<HTMLInputElement> = ({target}) =>{
        const {id,value} = target as {id:'email'|'user_name'|'password'|'password_confirmation';value:string;};
        setData(id,value);
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('reset_password'),{
            onSuccess:()=>{
                onClose();
                toast.success('Password Reset Succesful');
            }
        });
        
    }

    useEffect(()=>{
        if(!open) reset();
    },[open])

    return(
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Reset Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter your User Name and Email to reset password...
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={onSubmit} id='form' className='flex flex-col gap-y-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='email'>Email</Label>
                        <Input disabled={processing} required autoFocus autoComplete='off' id='email' value={email} onChange={handleChange}/>
                        {errors.email && <p className='text-destructive text-xs text-right -mt-3'>{errors.email}</p>}
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='user_name'>User Name</Label>
                        <Input disabled={processing} required autoComplete='off' id='user_name' value={user_name} onChange={handleChange}/>
                        {errors.user_name && <p className='text-destructive text-xs text-right -mt-3'>{errors.user_name}</p>}
                    </div>

                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='password'>New Password</Label>
                        <Input disabled={processing} required autoComplete='off' type='password' id='password' value={password} onChange={handleChange}/>
                        {errors.password && <p className='text-destructive text-xs text-right -mt-3'>{errors.password}</p>}
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='password_confirmation'>Current Password</Label>
                        <Input disabled={processing} required autoComplete='off' type='password' id='password_confirmation' value={password_confirmation} onChange={handleChange}/>
                        {errors.password_confirmation && <p className='text-destructive text-xs text-right -mt-3'>{errors.password_confirmation}</p>}
                    </div>
                </form>
                <AlertDialogFooter>
                    <Button disabled={processing} onClick={onClose}>Cancel</Button>
                    <Button disabled={processing} form='form'>Proceed</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
