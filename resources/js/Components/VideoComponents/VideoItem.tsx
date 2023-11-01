import { Video } from '@/types'
import { format } from 'date-fns';
import React, { FC, useEffect, useRef } from 'react'


interface VideoItemProps{
    video:Video
}

const VideoItem:FC<VideoItemProps> = ({video}) => {
    const vid=useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(!vid.current) return;
        vid.current.currentTime=1
    },[vid])
    return (
        <div className='w-full aspect-video relative py-12'>
            <p className='text-sm absolute top-0 inset-x-0 bg-gray-900/20 text-white truncate'>
                {video.name}
            </p>
            <video ref={vid} controls className='h-full w-full' src={`${video.path}#t=5,5`} />
            <p className='text-xs absolute bottom-0-0 inset-x-0 bg-gray-900/20 text-white truncate'>
                Uploaded On:&nbsp;{format(new Date(video.created_at),'PPpp')}
            </p>
        </div>
    )
}

export default VideoItem