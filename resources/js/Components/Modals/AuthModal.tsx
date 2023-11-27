import React, { FC, FormEventHandler, useEffect, useState, ChangeEventHandler } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { ArrowRightSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Spinner from '../Spinner'
import { useAuthModal } from '@/Hooks/useAuthModal'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Separator } from '@radix-ui/react-dropdown-menu';

const AuthModal:FC = () => {

    const {onClose,isOpen} = useAuthModal();

    const {data,setData,processing,errors,reset,post} = useForm({
        email:"",
        password:""
    });

    const [registerOpen, setRegisterOpen] = useState(false);

    const [resetPasswordOpen, SetResetPasswordOpen] = useState(false);

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
                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input required type='password' value={data.password} onChange={({target})=>setData('password',target.value)} disabled={processing} id="password"
                            className="col-span-3 dark:bg-[#e3cfff]" />
                    </div>
                    {errors.password && <p className='text-destructive text-xs text-right -mt-3'>{errors.password}</p>}
                </form>
                <DialogFooter>
                    <Button onClick={()=>SetResetPasswordOpen(true)} variant='link' className='text-xs text-gray-800 pl-0 mr-auto'>Forgot Password?</Button>
                    <Button variant='outline' disabled={processing} size='sm' form='auth' type="submit" className='dark:bg-[#e3cfff] dark:hover:text-gray-700'>
                        {processing ? <Spinner />: <ArrowRightSquare className='h-5 w-5' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
            <ForgotPasswordModal open={resetPasswordOpen} onClose={()=>SetResetPasswordOpen(false)} />
        </Dialog>
    )
}

export default AuthModal

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

    const [resetPasswordOpen, SetResetPasswordOpen] = useState(false);

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
