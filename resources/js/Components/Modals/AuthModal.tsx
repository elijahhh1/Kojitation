import React, { FC, FormEventHandler, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { ArrowRightSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Spinner from '../Spinner'
import { useAuthModal } from '@/Hooks/useAuthModal'


const AuthModal:FC = () => {

    const {onClose,isOpen} = useAuthModal();

    const {data,setData,processing,errors,reset,post} = useForm({
        email:"",
        password:""
    });

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
                    <Button variant='outline' disabled={processing} size='sm' form='auth' type="submit" className='dark:bg-[#e3cfff] dark:hover:text-gray-700'>
                        {processing ? <Spinner />: <ArrowRightSquare className='h-5 w-5' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal