import { Document } from '@/types'
import { router } from '@inertiajs/react';
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, Copy, Globe } from 'lucide-react';

interface Props{
    document:Document;
}

const Publish:FC<Props> = ({document}) => {
    const {id} = document;
    const url = route('preview',{id});
    const [copied,setCopied] = useState(false);
    const [loading,setLoading] = useState(false);
    const onPublish=()=>{
        setLoading(true);
        router.post(route('documents.update',{id}),{
            is_published:1
        },{
            onError:()=>toast.error('Something Went Wrong. Please try again....'),
            onSuccess:()=>toast.success('Document Published'),
            onFinish:()=>setLoading(false)
        });
    }

    const onUnPublish=()=>{
        setLoading(true);
        router.post(route('documents.update',{id}),{
            is_published:0
        },{
            onError:()=>toast.error('Something Went Wrong. Please try again....'),
            onSuccess:()=>toast.success('Document Unpublished'),
            onFinish:()=>setLoading(false)
        });
    }
    
    const onCopy = ()=> {
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('URL Copied',{duration:1000});
        setTimeout(()=>setCopied(false),1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='sm' variant='ghost'>
                    Publish
                    {document.is_published===1 && <Globe className='text-sky-500 w-4 h-4 ml-2' />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
                {document.is_published===1?(
                    <div className='flex flex-col space-y-4'>
                        <div className='flex items-center gap-x-2'>
                            <Globe className='text-sky-500 animate-pulse h-4 w-4' />
                            <p className='text-xs font-medium text-sky-500'>This Note is Live</p>
                        </div>
                        <div className='flex items-center'>
                            <input value={url} className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate' disabled />
                            <Button onClick={onCopy} disabled={copied} className='h-8 rounded-l-none'>
                                {copied?<Check className='h-4 w-4' />:<Copy className='h-4 w-4' />}
                            </Button>
                        </div>
                        <Button size='sm' className='w-full text-sm' disabled={loading} onClick={onUnPublish}>UnPublish</Button>
                    </div>
                ):(
                    <div className='flex flex-col items-center justify-center'>
                        <Globe className='h-8 w-8 text-muted-foreground mb-2' />    
                        <p className='text-sm font-medium mb-2'>Publish this Note</p>
                        <span className='text-xs text-muted-foreground mb-4'>Share this with others</span>
                        <Button disabled={loading} onClick={onPublish} className='w-full text-xs' size='sm'>Publish</Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default Publish