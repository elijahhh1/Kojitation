import { useEffect, FormEventHandler } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="name" >Name</Label>

                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.email&& <p className='text-xs text-destructive'>{errors.name}</p> }
                </div>

                <div className="mt-4">
                    <Label htmlFor="email" >Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    {errors.email&& <p className='text-xs text-destructive'>{errors.name}</p> }
                </div>

                <div className="mt-4">
                    <Label htmlFor="password" >Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <p>Password should have at least 8 characters</p>
                    <p>Password should contain at least 1 special character</p>

                    {errors.email&& <p className='text-xs text-destructive'>{errors.password}</p> }
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation" >Confirm Password</Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    {errors.email&& <p className='text-xs text-destructive'>{errors.password_confirmation}</p> }
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <Button className="ml-4" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
}
