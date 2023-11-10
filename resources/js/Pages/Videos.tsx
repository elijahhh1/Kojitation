import Cover from '@/Components/DocumentViewComponents/Cover';
import Editor from '@/Components/Editor';
import ToolBar from '@/Components/ToolBar';
import VideoItem from '@/Components/VideoComponents/VideoItem';
import { Button } from '@/Components/ui/button';
import { useUploadVideoModal } from '@/Hooks/useUploadVideoModal';
import VideoLayout from '@/Layouts/VideoLayout';
import { Document, PageProps, Video } from '@/types'
import { Head, usePage } from '@inertiajs/react';
import { VideoIcon } from 'lucide-react';
import {FC, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { format } from 'date-fns';
import VideoContainer from '@/Components/VideoComponents/VideoContainer';

const Videos:FC<{videos:Video[]}> = ({videos}) => {
    
    const user = usePage<PageProps>().props.auth.user;
    const {onOpen} = useUploadVideoModal();
    return (
        <>
            
            <Head title='Videos' />
            <VideoLayout >
                <div className='h-full flex flex-col relative overflow-hidden'>
                    <header className='flex items-center h-12 border-b border-b-muted-foreground relative'>
                        <h1 className='text-center text-2xl font-semibold tracking-tight flex-1'>Koji Admin's Videos</h1>
                        {
                            user.level===1&&(
                                <Button onClick={onOpen} size='sm' className='font-medium text-md flex space-x-2 items-center justify-center absolute top-1 right-1' variant='outline'> 
                                    <VideoIcon className='h-5 w-5' />
                                    <span>Upload</span>
                                </Button>
                            )
                        }
                        
                    </header>

                    {
                        videos.length>0?<VideoContainer videos={videos} />:(
                            <p className='pt-20 w-full text-center text-3xl font-semibold tracking-tight'>
                                No Videos Uploaded...
                            </p>
                        )
                    }
                    

                    
                </div>
            </VideoLayout>
        </>
    )
}

export default Videos;


