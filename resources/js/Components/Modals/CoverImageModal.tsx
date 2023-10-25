import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { useCoverImageModal } from '@/Hooks/useCoverImageModal'
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { toast } from 'sonner';
import { SingleImageDropzone } from '../SingleImageDropzone';

const CoverImageModal = () => {
    const {isOpen,onClose} = useCoverImageModal();
    const [file,setFile] = useState<File>();
    const [loading,setLoading] = useState(false);
    const {selected_document} = usePage<PageProps>().props;

    const onChange=(file?:File)=>{
        if(!selected_document) return;
        if(!file) return;
        const {id} = selected_document;
        setLoading(true);
        setFile(file);
        router.post(route('documents.update',{id}),{
            cover_image:file
        },{
            onSuccess:()=>{
                toast.success('Cover Image Set');
                setFile(undefined);
                onClose();
            },
            onError:()=>toast.error('Something Went Wrong. Please try again....'),
            onFinish:()=>setLoading(false)
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
                </DialogHeader>
                <div>
                    <SingleImageDropzone className='w-full' disabled={loading} value={file} onChange={onChange} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CoverImageModal