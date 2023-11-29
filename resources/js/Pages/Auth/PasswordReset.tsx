import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { FC, FormEventHandler } from 'react'
import { toast } from 'sonner';


interface Props{
    code:string;
    user:User;
}

const PasswordReset:FC<Props> = ({code,user}) => {

    const {data,setData,processing,post,errors} = useForm({password:"",password_confirmation:"",id:user.id,code});

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();

        if(data.password!==data.password_confirmation) {
            errors.password = 'Passwords do not match';
            toast.error('Passwors do not match')
            return;
        }

        post(route('password_confirmation'),{
            onError:()=>toast.error('Something  went Wrong. Please try again'),
            onSuccess:()=>toast.success('Password Changed. Proceed to Login'),
            preserveState:true
        });
    }

    return (
        <div className='pt-16 md:pt-40   w-full flex md:items-center justify-center'>
            <Card className="w-[21.875rem]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter Your New Password Below. Do not refresh  this page</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id='form' onSubmit={onSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label>UserName</Label>
                                <Input disabled value={user.user_name} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Email</Label>
                                <Input disabled value={user.email} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input required disabled={processing} autoComplete='off' value={data.password} onChange={({target})=>setData('password',target.value)} type='password' id="password" placeholder="Your new Password" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input required disabled={processing} autoComplete='off' value={data.password_confirmation} onChange={({target})=>setData('password_confirmation',target.value)} type='password' id="password_confirmation" placeholder="Confirm Your new Password" />
                            </div>
                            {errors.password&& <p className='text-sm text-destructive'>{errors.password}</p> }
                        </div>
                    </form>
                </CardContent>
                <CardFooter >
                    <Button type='submit' form='form'>Confirm Password</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PasswordReset