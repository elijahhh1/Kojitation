import { useUploadVideoModal } from '@/Hooks/useUploadVideoModal';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { SingleVideoDropzone } from '../SingleVideoDropzone';

const UploadVideoModal = () => {
    const {isOpen,onClose} = useUploadVideoModal();
    const [file,setFile] = useState<File>();
    const [loading,setLoading] = useState(false);

    const onChange=(file?:File)=>{
        if(!file) return;
        if(!file.type) return;
        if (file.type !== "video/mp4") {
            toast.error('File must be MP4') ;
            return;
        }

        setLoading(true);
        setFile(file);
        
        router.post(route('videos.store'),{
            video:file
        },{
            preserveState:false,
            onSuccess:()=>{
                toast.success('Video Uploaded');
                setFile(undefined);
                onClose();
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....'),
            onFinish:()=>setLoading(false)
        });
    } 

    useEffect(()=>{
        if(!isOpen) setFile(undefined);
    },[isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className='text-center text-lg font-semibold'>{`${loading?'Uploading':'Upload a'}  Video`}</h2>
                </DialogHeader>
                <div>
                    <SingleVideoDropzone className='w-full' disabled={loading} value={file} onChange={onChange} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UploadVideoModal