import { Video } from '@/types'
import {FC} from 'react'
import { Carousel } from 'react-responsive-carousel'
import VideoItem from './VideoItem'

const VideoContainer:FC<{videos:Video[]}> = ({videos}) => {
    return (
        <div className='p-6 flex-1 flex flex-col overflow-hidden h-full'>
            <Carousel className='h-full aspect-video ' emulateTouch infiniteLoop showThumbs onClickThumb={()=>{}}  swipeable>
                {videos.map(video=><VideoItem key={video.id} video={video} />)}
            </Carousel>
        </div>
    )
}

export default VideoContainer