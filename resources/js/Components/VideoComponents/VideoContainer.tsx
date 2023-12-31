import { Video } from '@/types'
import {FC} from 'react'
import { Carousel } from 'react-responsive-carousel'
import VideoItem from './VideoItem'

const VideoContainer:FC<{videos:Video[]}> = ({videos}) => {
    return (

        <div className='p-6 flex-1 flex items-center justify-center '>
            
            <Carousel className='w-4/5' infiniteLoop  emulateTouch  showThumbs onClickThumb={()=>{}}  swipeable>
                {videos.map(video=><VideoItem key={video.id} video={video} />)}
            </Carousel>
        </div>
    )
}

export default VideoContainer