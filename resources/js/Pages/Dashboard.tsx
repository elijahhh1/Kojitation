import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps, Mood, Feedback } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle, X } from 'lucide-react';
import {FC,useEffect,useMemo, useState} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps  } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog'
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
import { useIntroModal } from '@/Hooks/useIntroModal';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AlertDialog, AlertDialogPortal, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { AlertDialogContent, AlertDialogHeader } from '@/Components/ui/alert-dialog';

const Dashboard:FC<{moods:Mood[], feedbacks:Feedback[]}> = ({moods,feedbacks}) => {

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

    useEffect(()=>{
        // console.error(user.show_introduction)
    })

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

                    {/* <div className='m-4 p-4 bg-white shadow rounded'>
                        {
                        (user.level==1)?
                            feedbacks.map(f=>
                                <div>
                                    <p>{f.message}</p>
                                </div>
                            )
                            :
                            <></>
                        }
                    </div> */}

                    <IntroModal />

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
            <div className='bg-white dark:bg-gray-950 bg-opacity-80 w-[6rem] text-center shadow-md rounded-md p-4'>
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



const IntroModal:FC = () => {
    const user = usePage<PageProps>().props.auth.user;

    const [isOpen, setIsOpen] = useState((user.show_introduction==1)?false:true);
    const [test, setTest] = useState(["hello","world"]);

    const renderArrowNext = (clickHandler: () => void, hasNext: boolean, label: string) =>
        <Button className='w-20 next-button' onClick={hasNext?clickHandler:updateIntroduction}>{hasNext?'Next':'Got it'}</Button>
    const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean, label: string) => <Button className='w-20 prev-button' onClick={clickHandler}>Back</Button>

    const updateIntroduction = () => {
        router.get(route('dashboard.store'));
        setIsOpen(false);
    }

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-center'>
                        <span className='text-center text-primary text-lg font-medium'>Quick Tour</span>
                        <X className='text-primary ml-auto cursor-pointer' onClick={()=>{setIsOpen(false)}}/>
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <Carousel renderArrowNext={renderArrowNext} renderArrowPrev={renderArrowPrev}  showArrows showStatus={false} showThumbs={false} emulateTouch
                    className='max-w-sm md:max-w-md'>
                    <div>
                        <img src={`${route('welcome')}/images/welcome.png`} className='h-[260px] object-cover' />
                        <p className='my-4'>Let's take a quick tour to introduce you to key features. Click "Next" to continue</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/account.png`} className='h-[260px] object-cover'  />
                        <p>Explore Your Dashboard</p>
                        <p>Your dashboard will help you to track your mood.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/journal.png`} className='h-[260px] object-cover' />
                        <p>Start Journaling</p>
                        <p>Begin your journey by creating your first journal entry.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/Happy.png`} className='h-[260px] object-cover' />
                        <p>Track Your Mood</p>
                        <p>Kojitation allows you to track your mood.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/task.png`} className='h-[260px] object-cover' />
                        <p>Stay Organized</p>
                        <p>Keep track of your tasks with Kojitation.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/video.png`} className='h-[260px] object-cover' />
                        <p>Enjoy Videos</p>
                        <p>Explore video content on Kojitation.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/bot.png`} className='h-[260px] object-cover' />
                        <p>Chat with the Bot</p>
                        <p>Engage with our chatbot to manage your stress.</p>
                    </div>
                    <div>
                        <img src={`${route('welcome')}/images/support.png`} className='h-[260px] object-cover' />
                        <p>Need Help?</p>
                        <p>If you have questions or encounter issues, Access FAQs or contact our support team.</p>
                    </div>
                </Carousel>
            </AlertDialogContent>
        </AlertDialog>
    )
};
