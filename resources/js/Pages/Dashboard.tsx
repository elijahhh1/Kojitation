import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps, Mood, Feedback, Result, User } from '@/types';
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
import axios from 'axios';

const Dashboard:FC<{moods:Mood[], feedbacks:Feedback[], stress_results:Result[], users:User[], current_user:any}> = ({moods,feedbacks,stress_results,users,current_user}) => {

    const qParam = new URLSearchParams(window.location.search)
    const type = qParam.get("month")

    const user = usePage<PageProps>().props.auth.user;
    var data = [{name: 'Page A', uv: "", pv: 2400, amt: 2400}, {name: 'Page B', uv: "", pv: 2500, amt: 2500}];

    var lineMoods= useMemo(()=>moods.map(({start,mood_level})=>({name:moment(String(start)).format('MMM DD'),icon:mood_level})),[moods]);

    const months = [{id:1,month:"January"},{id:2,month:"February"},{id:3,month:"March"},{id:4,month:"April"},
                    {id:5,month:"May"},{id:6,month:"June"},{id:7,month:"July"},{id:8,month:"August"},
                    {id:9,month:"September"},{id:10,month:"October"},{id:11,month:"November"},{id:12,month:"December"}];

    const [selectedMonth, setselectedMonth] = useState(format(new Date(2023, (type==null?new Date().getMonth():(parseInt(type)-1)), 1), "MMMM"));

    const [openFeedback, setOpenFeedback] = useState(false);
    const [userFeedback, setUserFeedback] = useState<Feedback|undefined>(undefined);

    const [openStressResult, setOpenStressResult] = useState(false);
    const [userStressResult, setuserStressResult] = useState<Result|undefined>(undefined);

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

    const onAdminMonthChange = (month:number) => {
        const found = months.find(f=>month==f.id);
        if (found) {
            setselectedMonth(found?.month);
        }
    }

    const onUserChange = (user_id:number,month:string) => {
        const found = users.find(u=>u.id==user_id);
        const foundMonth = months.find(f=>month==f.month);
        var comp = this;

        if (found && foundMonth) {
            axios.post(route('dashboard.show_user_mood'),
            {
                month:foundMonth?.id,
                user_id:user_id,
            })
            .then(function (response)
            {
                onMoodsChange(response.data);
            })
            .catch(function (error)
            {
                console.error(error);
            })
        }
    }

    const onMoodsChange = (newMoods:Mood[]) => {
        lineMoods = useMemo(()=>newMoods.map(({start,mood_level})=>({name:moment(String(start)).format('MMM DD'),icon:mood_level})),[newMoods]);
    }

    const openUserFeedbackItem = (uFeedback:Feedback) => {
        setOpenFeedback(true);
        setUserFeedback(uFeedback);
    }

    const openUserStressResultItem = (uStressResult:Result) => {
        setOpenStressResult(true);
        setuserStressResult(uStressResult);
    }

    useEffect(()=>{
        console.log(current_user)
    }, [current_user])

    useEffect(()=>{
        if (user.level === 1) {
            // router.get(route('dashboard.show', {month}),{
            //     month
            // },{
            //     preserveState:false,
            //     onSuccess:()=>{
            //         setselectedMonth(found?.month);
            //     }
            // });
        }
    }, [user])

    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout>
                <div className='h-full'>
                    <header className='p-4 flex items-center justify-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='text-md font-bold dark:invert'>{user.name}'s Dashboard</h1>
                    </header>

                    {
                        user.level==0?
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
                                <div className='py-4 w-full'>
                                    <RenderLineChart linedata={lineMoods}/>
                                </div>
                            </div>
                        </div>
                        :
                        // For admin ************
                        <div className='m-4'>
                            <div className='w-full p-4 rounded-md'>
                                <div className='p-4 bg-slate-100 dark:bg-slate-800 rounded-md'>
                                    <div className='flex items-center'>
                                        <div className='flex items-center mb-4 mr-2'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">
                                                        <span>{users[0].name + "'s Mood Graph"}</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {
                                                        users.map(u=>
                                                        <DropdownMenuItem key={u.id} onClick={() => onUserChange(u.id,selectedMonth)}>
                                                            {u.name}
                                                        </DropdownMenuItem>)
                                                    }
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className='flex items-center mb-4'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">
                                                        <span>{selectedMonth}</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {
                                                        months.map(m=>
                                                        <DropdownMenuItem key={m.id} onClick={() => onAdminMonthChange(m.id)}>
                                                            {m.month}
                                                        </DropdownMenuItem>)
                                                    }
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <div className='h-[20rem] md:h-[25rem]'>
                                        <RenderLineChart linedata={lineMoods}/>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row space-y-1 md:space-y-0'>
                                <div className='w-full md:w-2/3 p-4'>
                                    <div className='bg-purple-50 dark:bg-slate-800 rounded-md p-4'>
                                        <h1 className='text-purple-600 dark:text-purple-200 font-bold mb-4'>User Feedbacks</h1>
                                        <div className='h-[20rem] md:h-[25rem] overflow-y-auto space-y-2'>
                                        {feedbacks.map(m=>
                                            <div key={m.id} className='bg-white dark:bg-slate-600 p-4 rounded-md'>
                                                <h1 className='text-sm mb-2 text-purple-500 dark:text-purple-300 font-bold'>{ m.user.name }</h1>
                                                <button onClick={()=>openUserFeedbackItem(m)} className='w-full mb-2'>
                                                    <p className='text-left truncate'>{m.message}</p>
                                                </button>
                                                <p className='text-xs'>{moment(String(m.created_at)).format('MMM DD, yyyy hh:mm')}</p>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:w-1/3 p-4'>
                                    <div className='bg-cyan-50 dark:bg-slate-800 rounded-md p-4'>
                                        <h1 className='text-cyan-600 dark:text-cyan-200 font-bold mb-4'>User Stress Results</h1>
                                        <div className='h-[20rem] md:h-[25rem] overflow-y-auto space-y-2'>
                                        {stress_results.map(s=>
                                            <div key={s.id} className='bg-white dark:bg-slate-600 p-4 rounded-md'>
                                                <h1 className='text-sm mb-2 text-cyan-500 dark:text-cyan-300 font-bold'>{ s.user.name }</h1>
                                                <button onClick={()=>openUserStressResultItem(s)} className='w-full mb-2'>
                                                    <p className='text-left truncate'>{s.remarks}</p>
                                                </button>
                                                <p className='text-xs'>{moment(String(s.created_at)).format('MMM DD, yyyy hh:mm')}</p>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <IntroModal />
                    <ViewAdminUserFeedback openFeedback={openFeedback} onClose={()=>setOpenFeedback(false)} userFeedback={userFeedback} />
                    <ViewAdminUserStressResult openStressResult={openStressResult} onClose={()=>setOpenStressResult(false)} userStressResult={userStressResult}  />

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
          );
}



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
}

const ViewAdminUserFeedback:FC<{openFeedback:boolean|undefined, onClose:()=>void, userFeedback:Feedback|undefined}> = ({openFeedback, onClose, userFeedback}) => {
    return (
        <Dialog open={openFeedback} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{userFeedback?.user.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {moment(String(userFeedback?.created_at)).format('MMM DD, yyyy hh:mm')}
                </DialogDescription>
                {userFeedback?.message}
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const ViewAdminUserStressResult:FC<{openStressResult:boolean|undefined, onClose:()=>void, userStressResult:Result|undefined}> = ({openStressResult, onClose, userStressResult}) => {
    return (
        <Dialog open={openStressResult} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{userStressResult?.user.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {moment(String(userStressResult?.created_at)).format('MMM DD, yyyy hh:mm')}
                </DialogDescription>
                {userStressResult?.remarks}
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

