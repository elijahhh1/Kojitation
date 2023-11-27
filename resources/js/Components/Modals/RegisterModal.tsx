import React, { FC, FormEventHandler, useEffect, ChangeEventHandler } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { ArrowRightSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Spinner from '../Spinner'


const RegisterModal:FC<{isOpen:boolean,onClose:()=>void}> = ({isOpen,onClose}) => {

    const {data,setData,processing,errors,reset,post} = useForm({
        name:"",
        user_name:"",
        email:"",
        password:"",
        password_confirmation:""
    });

    useEffect(()=>{
        if (!isOpen) {
            reset();
            errors.name="";
            errors.user_name="";
            errors.email="";
            errors.password="";
            errors.password_confirmation="";
        };
    },[isOpen]);

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('register'),{
            onSuccess:()=>{
                isOpen = false;
                toast.success('Registration successful');
                onClose();
            },
            onError:(e)=>console.log(e)
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#DAEAFF] dark:text-gray-900">
                <DialogHeader>
                    <DialogTitle>SIGN UP</DialogTitle>
                    <DialogDescription className='dark:text-gray-700'>
                        Enter Login Credentials
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='auth' className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="name" className="text-right">
                            Fullname
                        </Label>
                        <Input required value={data.name} onChange={({target})=>setData('name',target.value)} disabled={processing} id="name"
                            className="col-span-3 dark:bg-[#bfdcff]" autoFocus autoComplete='off'/>
                    </div>
                    {errors.name && <p className='text-destructive text-xs text-right -mt-3'>{errors.name}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="user_name" className="text-right">
                            UserName
                        </Label>
                        <Input required value={data.user_name} onChange={({target})=>setData('user_name',target.value)} disabled={processing} id="user_name"
                            className="col-span-3 dark:bg-[#bfdcff]" autoComplete='off'/>
                    </div>
                    {errors.user_name && <p className='text-destructive text-xs text-right -mt-3'>{errors.user_name}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input required value={data.email} onChange={({target})=>setData('email',target.value)} disabled={processing} id="email"
                            className="col-span-3 dark:bg-[#bfdcff]" autoComplete='off'/>
                    </div>
                    {errors.email && <p className='text-destructive text-xs text-right -mt-3'>{errors.email}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input required type='password' value={data.password} onChange={({target})=>setData('password',target.value)} disabled={processing} id="password"
                            className="col-span-3 dark:bg-[#bfdcff]" />
                        <p className='m-0 text-gray-600 text-xs'>Password should have at least 8 characters</p>
                        <p className='m-0 text-gray-600 text-xs'>Password should contain at least 1 special character</p>
                    </div>
                    {errors.password && <p className='text-destructive text-xs text-right -mt-3'>{errors.password}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password_confirmation" className="text-right">
                            Confirm Password
                        </Label>
                        <Input required type='password' value={data.password_confirmation} onChange={({target})=>setData('password_confirmation',target.value)} disabled={processing} id="password_confirmation"
                            className="col-span-3 dark:bg-[#bfdcff]" />
                    </div>
                    {errors.password_confirmation && <p className='text-destructive text-xs text-right -mt-3'>{errors.password_confirmation}</p>}
                </form>
                <DialogFooter>
                    <Button variant='outline' disabled={processing} size='sm' form='auth' type="submit" className='bg-[#86bdff] hover:bg-[#bfdcff] dark:hover:text-gray-900'>
                        {processing ? <Spinner />: <ArrowRightSquare className='h-5 w-5' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterModal;
