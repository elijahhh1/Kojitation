import Cover from '@/Components/DocumentViewComponents/Cover';
import Editor from '@/Components/Editor';
import ToolBar from '@/Components/ToolBar';
import VideoLayout from '@/Layouts/VideoLayout';
import { Document } from '@/types'
import { Head } from '@inertiajs/react';
import {FC} from 'react'

const Videos:FC = () => {
    return (
        <>
            <Head title='Dashboard' />
            <VideoLayout >
                <div className='h-full'>
                    <header className='p-4 flex items-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='dark:invert'>Kojitation's Video</h1>
                    </header>

                    <div className='px-4 md:p-12 bg-gray-50 dark:invert'>
                        <div className='flex h-[25rem]'>
                            <div className='p-4 w-full'>

                            </div>
                        </div>
                    </div>
                </div>
            </VideoLayout>
        </>
    )
}

export default Videos
