import { Video } from '@/types'
import { format } from 'date-fns';
import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface VideoItemProps{
    video:Video
}

const VideoItem:FC<VideoItemProps> = ({video}) => {
    
    const [showConfirmation,setShowConfirmation] = useState(false);
    const vid=useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(!vid.current) return;
        vid.current.currentTime=1
    },[vid])
    return (
        <>
            <div className='w-full relative h-auto flex flex-col group'>
                <Button onClick={()=>setShowConfirmation(true)} className='opacity-0 group-hover:opacity-100 transition duration-300 absolute top-6 right-6 z-50' size='icon' variant='destructive'>
                    <Trash2 className='h-5 w-5' />
                </Button>
                <p className='text-sm absolute top-0 inset-x-0 bg-gray-900/20 text-white truncate'>
                    {video.name}
                </p>
                <video ref={vid} controls className=' object-fill ' src={`${video.path}#t=5,5`} />
                <p className='text-xs absolute bottom-0 inset-x-0 bg-gray-900/20 text-white truncate'>
                    Uploaded On:&nbsp;{format(new Date(video.created_at),'PPpp')}
                </p>
            </div>
            <DeleteConfirmation id={video.id} open={showConfirmation} onClose={()=>setShowConfirmation(false)} />
        </>
    )
}

export default VideoItem;


interface DeleteConfirmationProps{
    open?:boolean;
    onClose:()=>void;
    id:number;
}

const DeleteConfirmation:FC<DeleteConfirmationProps> = ({open,onClose,id}) =>{

    const {processing,post} = useForm({id})
    const onClick = () =>{
        post(route('videos.destroy'),{
            onError:()=>toast.error('Something went wrong. Please try again'),
            onSuccess:()=>toast.success('Video Deleted!')
        })
    }
    return(
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the video.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <Button onClick={onClick} disabled={processing}>
                        {processing&&<Loader2 className='h-4 w-4 mr-2 animate-spin' />}
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}