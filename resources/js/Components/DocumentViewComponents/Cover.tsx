import { cn } from '@/lib/utils';
import React, { FC } from 'react'
import { Button } from '../ui/button';
import { ImageIcon, XIcon } from 'lucide-react';
import { useCoverImageModal } from '@/Hooks/useCoverImageModal';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Document } from '@/types';

interface CoverProps{
    document?:Document;
    preview?:boolean;
    
}

const Cover:FC<CoverProps> = ({preview,document}) => {
    
    const {onOpen} =useCoverImageModal();
    const url = document?.cover_image;
    const onRemoveIcon = () =>{
        if(!document) return;
        const {id}=document;
        router.post(route('documents.remove_cover',{id}),{},{
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        })
    };
    return (
        <div className={cn('relative w-full h-[35vh] group',
            !url ? 'h-[12vh]':'bg-muted')}>
            {!!url && <img src={url} alt='Cover' className='object-fill w-full h-full' />}
            {
                (url && !preview) && (
                    <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
                        <Button onClick={onOpen} className='text-muted-foreground text-xs' variant='outline' size='sm'>
                            <ImageIcon className='h-4 w-4 mr-2' />
                            <span>Change Cover</span>
                        </Button>
                        <Button onClick={onRemoveIcon} className='text-muted-foreground text-xs' variant='outline' size='sm'>
                            <XIcon className='h-4 w-4 mr-2' />
                            <span>Remove Cover</span>
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default Cover