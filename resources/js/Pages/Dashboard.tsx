import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps, Mood } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react';
import {FC,useEffect,useMemo} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { log } from 'console';

const Dashboard:FC<{moods:Mood[]}> = ({moods}) => {

    const user = usePage<PageProps>().props.auth.user;
    var data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 500, pv: 2500, amt: 2500}];

    const lineMoods= useMemo(()=>moods.map(({start,user_id,icon})=>({name:new Date(start),icon,uv:icon,pv:user_id,amt:2400})),[moods]);

    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout >
                <div className='h-full'>
                    <header className='px-12 flex items-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='dark:invert'>Welcome {user.name}!</h1>
                    </header>

                    <div className='p-12 bg-gray-50 dark:invert'>
                        <div className='flex h-[20rem]'>
                            <div className='p-4 w-2/3'>
                                <RenderLineChart linedata={data}/>
                            </div>
                            <div className='p-4 w-1/3'>
                                {/* calendar here */}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;

const RenderLineChart:FC<{linedata:{"name":string; "uv":number; "pv":number; "amt":number;}[]}> = ({linedata}) => {
    return (
        <ResponsiveContainer>
            <LineChart width={600} height={300} data={linedata}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
  );}
