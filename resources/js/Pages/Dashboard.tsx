import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps, Mood } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react';
import {FC,useEffect,useMemo, useState} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps  } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';
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

    const qParam = new URLSearchParams(window.location.search)
    const type = qParam.get("month")

    const user = usePage<PageProps>().props.auth.user;
    var data = [{name: 'Page A', uv: "", pv: 2400, amt: 2400}, {name: 'Page B', uv: "", pv: 2500, amt: 2500}];

    const lineMoods= useMemo(()=>moods.map(({start,mood_level})=>({name:moment(String(start)).format('MMM DD'),icon:mood_level})),[moods]);

    const months = [{id:9,month:"September"},{id:10,month:"October"},{id:11,month:"November"}];

    const [selectedMonth, setselectedMonth] = useState(format(new Date(2023, (type==null?new Date().getMonth():(parseInt(type)-1)), 1), "MMMM"));

    const onMonthChange = (month:number) => {
        const found = months.find(f=>month==f.id);
        if (found) {
            router.get(route('dashboard.show', {month}),{
                month
            },{
                preserveState:false,
                onSuccess:()=>{
                    setselectedMonth(found?.month);
                }
            });
        }
    }

    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout >
                <div className='h-full'>
                    <header className='p-4 flex items-center justify-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='text-md font-bold dark:invert'>{user.name}'s Dashboard</h1>
                    </header>

                    <div className='m-4 py-4 pr-4 md:px-8 md:py-0 bg-gray-50 dark:invert shadow-md rounded-md'>
                        <div className='flex items-center justify-center'>
                            <p className='mx-2 dark:invert'>Select month:</p>
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
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className='flex h-[20rem] md:h-[25rem] dark:invert'>
                            <div className='py-4 w-full '>
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

    const renderCustomAxisTick = (payload:any) => {

        var mood = "";

        switch (payload.index) {
            case 1:
                mood = "😡";
                break;
            case 2  :
                mood = "😞";
                break;
            case 3:
                mood = "😐";
                break;
            case 4:
                mood = "🙂";
                break;
            case 5:
                mood = "😄";
                break;
        }

        return(<text x={payload.x - 30} y={payload.y + 10} width={24} height={24} className='text-2xl'>{mood}</text>);
    };

    const CustomTooltip = ({active,payload,label}: TooltipProps<ValueType, NameType>) => {
        var mood = "";
        switch (payload?.[0]?.value) {
            case 1:
                mood = "😡";
                break;
            case 2  :
                mood = "😞";
                break;
            case 3:
                mood = "😐";
                break;
            case 4:
                mood = "🙂";
                break;
            case 5:
                mood = "😄";
                break;
            default:
                mood = "";
                break;
        }
        return (
            <div className='dark:invert bg-white bg-opacity-80 w-[6rem] text-center shadow-md rounded-md p-4'>
                <p className='text-2xl'>{mood}</p>
                <p>{label}</p>
            </div>
          );
    }

    return (
        <ResponsiveContainer>
            <LineChart width={500} height={300} data={linedata}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="icon" stroke="#8884d8" />
                <XAxis dataKey="name" angle={-40} textAnchor={"end"} height={50} />
                <YAxis dataKey="icon" ticks={[0,1,2,3,4,5]} domain={[0, 5]} tick={renderCustomAxisTick}/>
                <Tooltip labelClassName='dark:invert' content={<CustomTooltip/>} />
            </LineChart>
        </ResponsiveContainer>
  );}
