import React, { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useSettings } from '@/Hooks/useSettings'
import { Label } from '../ui/label'
import { ModeToggle } from '../ModeToggle'
import { APP_NAME } from '@/Pages/Welcome'
import { useFAQModal } from '@/Hooks/useFAQModal'
import { Carousel } from 'react-responsive-carousel'

const FaqModal:FC = () => {
    const {isOpen,onClose} = useFAQModal();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-gradient-to-b from-[#DDEDEA] via-[#DAEAFF] to-[#E8DFF5] dark:text-gray-900'>
                <DialogHeader className='dark:text-gray-900'>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='text-lg font-medium'>FAQs</span>
                    </DialogTitle>
                </DialogHeader>

                <div className='max-h-[30rem] overflow-auto dark:text-gray-900'>
                    <div className='bg-[#FCE1E4] shadow rounded p-4'>
                        <h1 className='font-bold'>MOOD CALENDAR</h1>
                        <div className='py-4 px-2 border-b border-[#dea4ab]'>
                            <h2 className='mb-2'>What is a Mood Calendar?</h2>
                            <p className='text-sm'>A Mood Calendar is a tool that allows you to track and record your daily moods, emotions, or feelings. 
                                It helps you monitor and have awareness about your emotional well-being.</p>
                        </div>
                        <div className='py-4 px-2 border-b border-[#dea4ab]'>
                            <h2 className='mb-2'>How do I use the Mood Calendar?</h2>
                            <p className='text-sm'>To use the Mood Calendar, simply select Mood Calendar on the left side of your screen. Then, 
                                click the (+) sign on the upper right corner of the Moon Calendar. Choose the mood or 
                                emotion that best represents how you're feeling that day. You can describe the Mood in detail (optional).</p>
                        </div>
                        <div className='py-4 px-2 border-b border-[#dea4ab]'>
                            <h2 className='mb-2'>Why should I use a Mood Calendar?</h2>
                            <p className='text-sm'>Using a Mood Calendar can help you gain insights into your emotional patterns, identify triggers, and 
                                track changes in your mood over time. It can be a valuable tool for self-awareness and mindfulness.</p>
                        </div>
                        <div className='py-4 px-2'>
                            <h2 className='mb-2'>Is my mood data private and secure?</h2>
                            <p className='text-sm'>Yes, your mood data is kept private and secure. We take data privacy seriously, and your information 
                                is only accessible to you unless you choose to share it.</p>
                        </div>
                    </div>

                    <div className='bg-[#DAEAFF] shadow rounded p-4 my-4'>
                        <h1 className='font-bold'>GRATITUDE JOURNALING</h1>
                        <div className='py-4 px-2 border-b border-[#a6c0e3]'>
                            <h2 className='mb-2'>What is Gratitude Journaling?</h2>
                            <p className='text-sm'>Gratitude Journaling is a practice of regularly recording things you are thankful for in your life. 
                            It promotes a positive mindset and emotional well-being.</p>
                        </div>
                        <div className='py-4 px-2 border-b border-[#a6c0e3]'>
                            <h2 className='mb-2'>How do I start Gratitude Journaling?</h2>
                            <p className='text-sm'>To start Gratitude Journaling, select "Add a Koji" under Journal on the left side of your screen. 
                            Write down things you're grateful for, no matter how big or small. We advise you to do this daily.</p>
                        </div>
                        <div className='py-4 px-2 border-b border-[#a6c0e3]'>
                            <h2 className='mb-2'>What are the benefits of Gratitude Journaling?</h2>
                            <p className='text-sm'>Gratitude Journaling can boost your mood, it helps you focus on the positive aspects of life.</p>
                        </div>
                        <div className='py-4 px-2'>
                            <h2 className='mb-2'>Is my journal private and secure?</h2>
                            <p className='text-sm'>Yes, your gratitude journal entries are private and secure. We respect your privacy, 
                            and your entries are not shared with anyone else.</p>
                        </div>
                    </div>

                    <div className='bg-[#E8DFF5] shadow rounded p-4 my-4'>
                        <h1 className='font-bold'>CHATBOT</h1>
                        <div className='py-4 px-2 border-b border-[#c0abde]'>
                            <h2 className='mb-2'>What can the Chatbot help me with?</h2>
                            <p className='text-sm'>Our Chatbot can assess with the state of your stress and will guide you through the process.</p>
                        </div>
                        <div className='py-4 px-2'>
                            <h2 className='mb-2'>Can I take an assessment test every day?</h2>
                            <p className='text-sm'>The assessment take can be only taken once a month or 
                            once every two weeks this is what our Psychometrician says.</p>
                        </div>
                    </div>

                    <div className='bg-[#DDEDEA] shadow rounded p-4 my-4'>
                        <h1 className='font-bold'>VIDEO</h1>
                        <div className='py-4 px-2 border-b border-[#addbd3]'>
                            <h2 className='mb-2'>What is the Video feature?</h2>
                            <p className='text-sm'>The Video feature allows you to watch videos of student talking about their stress and 
                            coping techniques which can be quite helpful if you're going through the same situation. 
                            It can be used for psychological education and awareness. As well as creating an empathetic community if 
                            students in school.</p>
                        </div>
                        <div className='py-4 px-2'>
                            <h2 className='mb-2'>Can I upload my own videos?</h2>
                            <p className='text-sm'>Unfortunately, only the administrator can upload videos. But you can send the admin a 
                            message if you want to be featured in our videos too!</p>
                        </div>
                    </div>

                    <div className='bg-[#ECD8A0] shadow rounded p-4 my-4'>
                        <h1 className='font-bold'>TASK MANAGEMENT</h1>
                        <div className='py-4 px-2 border-b border-[#d9bf77]'>
                            <h2 className='mb-2'>What is Task Management?</h2>
                            <p className='text-sm'>Task Management is a feature of Kojitation wherein you can organize and 
                            track tasks or activities to ensure they are completed efficiently and on time.</p>
                        </div>
                        <div className='py-4 px-2'>
                            <h2 className='mb-2'>How do I create a new task?</h2>
                            <p className='text-sm'>To create a new task, select "(name of user)'s Tasks" on the left side of the screen. 
                            Then select "New Task list" on the upper right side of the screen. After creating a task list you can add 
                            up a detailed task for that list.</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FaqModal