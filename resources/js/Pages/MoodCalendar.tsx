import { FC, useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar,  Event,  momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Head } from '@inertiajs/react';
import DocumentsLayout from '@/Layouts/DocumentsLayout';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import MoodModal from '@/Components/Modals/MoodModal';
import { Mood } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog'
import { format } from 'date-fns';

const MoodCalendar:FC<{moods:Mood[]}> = ({moods}) => {
    const [open,setOpen] = useState(false);
    const [moodDialog,setMoodDialog] = useState<{open?:boolean;data?:Event}>({
        open:false,
        data:undefined
    });
    const localizer = momentLocalizer(moment);
    const MOODS:Event[] = useMemo(()=>moods.map(({id,description,icon,start,end})=>({
        title:icon,
        start:new Date(start),
        end:new  Date(end),
        resource: {
            id,description
        }
    })),[moods]);

    const onSelect  = (e:Event) =>{
        setMoodDialog(val=>({
            open:true,
            data:e
        }));
    }

    const onClose  = ()=>{
        setMoodDialog(val=>({
            open:false,
            data:undefined
        }));
    }

    return (
        <>
            <Head title='Mood Calendar' />
            <DocumentsLayout>
                <div className='flex flex-col overflow-hidden max-w-5xl mx-auto px-2.5 h-full '>
                    
                    
                    <div className='pt-2.5 mb-3.5 border-b border-b-muted-foreground/40 pb-6 flex items-center '>
                        <p className='flex-1 font-bold tracking-tight text-xl text-start pl-7 md:pl-0 md:text-3xl md:text-center'>Mood Calendar</p>
                        
                        <Button onClick={()=>setOpen(true)} size='sm' variant='outline'>
                            <PlusCircle  className='w-5 h-5' />
                        </Button>
                        
                    </div>
                    
                    <div className='flex-1 py-3.5'>
                        <Calendar events={MOODS} localizer={localizer} onSelectEvent={onSelect} views={['month','week','day']} />
                    </div>

                </div>
            </DocumentsLayout>
            <MoodModal open={open} onClose={()=>setOpen(false)} />
            <MoodDialog open={moodDialog.open} icon={moodDialog.data?.title as string} description={moodDialog.data?.resource.description} date={moodDialog.data?.start} onClose={onClose} />
        </>
    )
}

export default MoodCalendar;

interface MoodDialogProps{
    open?:boolean;
    onClose:()=>void;
    icon?:string;
    description?:string;
    date?:Date;
}

const MoodDialog:FC<MoodDialogProps> = ({icon,description,date,open,onClose}) =>{

    if (!icon) return null;
    if (!date) return null;

    return(
        <Dialog  open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-center text-6xl'>{icon}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <p className='text-center text-muted-foreground'>
                    {
                        format(date,'PPpp')
                    }
                </p>
                <DialogFooter >
                    
                    <Button type="submit" size='sm'>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}




