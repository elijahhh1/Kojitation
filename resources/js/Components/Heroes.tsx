import React, { FC } from 'react'

const Heroes:FC = () => {
    return (
        <div className='flex flex-col items-center justify-center max-w-5xl'>
            <div className='flex items-center'>
                <div className='relative w-[18.75rem] h-[18.75rem] sm:w-[21.875rem] sm:h-[21.875rem] md:w-[25rem] md:h-[25rem]'>
                    <img src={`${route('welcome')}/images/documents.png`} className='object-contain dark:invert' alt='Image'/>
                </div>
                <div className='relative md:w-[25rem] md:h-[25rem]'>
                    <img src={`${route('welcome')}/images/reading.png`} className='object-contain dark:invert hidden md:block' alt='Image'/>
                </div>
            </div>
        </div>
    )
}

export default Heroes