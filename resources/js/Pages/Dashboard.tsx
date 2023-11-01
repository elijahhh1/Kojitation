import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps, Mood } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react';
import {FC,useEffect,useMemo, useState} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { log } from 'console';
import { emojis } from '@/Components/Modals/MoodModal';
import moment from 'moment';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
  } from "@/Components/ui/dropdown-menu";

const Dashboard:FC<{moods:Mood[]}> = ({moods}) => {

    const user = usePage<PageProps>().props.auth.user;
    var data = [{name: 'Page A', uv: "", pv: 2400, amt: 2400}, {name: 'Page B', uv: "", pv: 2500, amt: 2500}];

    const lineMoods= useMemo(()=>moods.map(({start,mood_level})=>({name:moment(String(start)).format('MMM DD'),icon:mood_level})),[moods]);

    const months = [{id:9,month:"September"},{id:10,month:"October"},{id:11,month:"November"}];

    const [selectedMonth, setselectedMonth] = useState("November");

    const onMonthChange = (month:number) => {
        const found = months.find(f=>month==f.id);
        if (found) {
            setselectedMonth(found?.month);

            router.get(route('dashboard.show', {month}),{
                month
            },{
                preserveState:true
            });
        }
    }

    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout >
                <div className='h-full'>
                    <header className='p-4 flex items-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='dark:invert'>Dashboard</h1>
                    </header>

                    <div className='px-4 md:p-12 bg-gray-50 dark:invert'>
                        <div className='flex items-center justify-center'>
                            <p className='mx-2'>Select month:</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <span>{selectedMonth}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        months.map(m=>
                                        <DropdownMenuItem key={m.id} onClick={() => onMonthChange(m.id)}>
                                            {m.month}
                                        </DropdownMenuItem>)
                                    }

                                    {/* <DropdownMenuItem onClick={() => onMonthChange(11)}>
                                        November
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onMonthChange(10)}>
                                        October
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onMonthChange(9)}>
                                        September
                                    </DropdownMenuItem> */}

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className='flex h-[25rem]'>
                            <div className='py-4 w-full'>
                                <RenderLineChart linedata={lineMoods}/>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;

const RenderLineChart:FC<{linedata:{"name":string; "icon":number;}[]}> = ({linedata}) => {
    return (
        <ResponsiveContainer>
            <LineChart width={600} height={300} data={linedata}>
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="icon" stroke="#8884d8" />
                <XAxis dataKey="name" angle={-40} textAnchor={"end"} height={50} interval={0} />
                <YAxis dataKey="icon" type="number" ticks={[0,1,2,3,4,5]} domain={[0, 5]}/>
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
  );}
