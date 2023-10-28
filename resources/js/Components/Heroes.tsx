import React, { FC } from 'react'

const Heroes:FC = () => {
    return (
        <div className='flex flex-col items-center max-w-5xl'>
            <div className='flex items-center'>
                {/* <div className='relative w-[18.75rem] h-[18.75rem] sm:w-[21.875rem] sm:h-[21.875rem] md:w-[25rem] md:h-[25rem]'>
                    <img src={`${route('welcome')}/images/documents.png`} className='object-contain dark:invert' alt='Image'/>
                </div>
                <div className='relative md:w-[25rem] md:h-[25rem]'>
                    <img src={`${route('welcome')}/images/reading.png`} className='object-contain dark:invert hidden md:block' alt='Image'/>
                </div> */}

                <div className='md:h-[25rem]'>
                    <img src={`${route('welcome')}/images/background.png`} className='w-[50rem] absolute left-0 top-[14rem] z-0 object-contain hidden md:block dark:invert' alt='Image'/>
                    <img src={`${route('welcome')}/images/background.png`} className='w-[50rem] absolute right-0 -top-10 z-0 object-contain hidden md:block dark:invert rotate-180' alt='Image'/>
                </div>
            </div>
        </div>
    )
}

export default Heroes
