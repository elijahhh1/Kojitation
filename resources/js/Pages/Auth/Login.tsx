import { useEffect, FormEventHandler } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';
import { Button } from '@/Components/ui/button';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className='flex flex-col h-full w-full items-center justify-center'>

            
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email&& <p className='text-xs text-destructive'>{errors.email}</p> }
                        
                    </div>

                    <div className="mt-4">
                    <Label htmlFor="email">Password</Label>

                        <Input
                            id="email"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        {errors.password&& <p className='text-xs text-destructive'>{errors.password}</p> }
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(e)=>setData('remember',!!e)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button size='sm' className="ml-4" disabled={processing}>
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
