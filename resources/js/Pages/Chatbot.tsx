import ChatbotLayout from '@/Layouts/ChatbotLayout';
import { Document } from '@/types'
import { Head } from '@inertiajs/react';
import {FC, useState, useEffect} from 'react'
import { Bot } from 'lucide-react';
import { log } from 'console';
import { cn } from "@/lib/utils"
import { setSeconds } from 'date-fns';

const Chatbot:FC = () => {

    return (
        <>
            <Head title='Chatbot' />
            <ChatbotLayout >
                <div className='h-full'>
                    <header className='p-4 flex items-center h-10 bg-gray-100 dark:invert'>
                        <h1 className='dark:invert'>Chatbot</h1>
                    </header>

                    <div className='px-4 md:p-12 dark:invert'>
                        <div className='h-[70vh] rounded-sm'>
                            <header className='px-4 flex items-center h-14 w-full bg-yellow-200 rounded-tl-sm rounded-tr-sm'>
                                <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full mr-2 dark:invert'>
                                    <Bot/>
                                </div>
                                <p className='dark:invert'>Koji</p>
                            </header>
                            <RenderData />
                        </div>
                    </div>
                </div>
            </ChatbotLayout>
        </>
    )
}

export default Chatbot;

const RenderData:FC = () => {

    const dataList = [
        {title: 'How do you prevent a situation from getting too stressful to manage?',
        description: "I prioritize tasks, break them into manageable steps, and ensure clear communication with my team. Regular breaks and mindfulness exercises also help."},
        {title: 'How would you respond if your manager gave you negative feedback in front of your peers?',
        description: "I would listen calmly, ask for specific examples, and request a private meeting to discuss further. It’s essential to focus on improvement rather than reacting defensively."}];

    const [messages, setMessages] = useState(dataList.map(data=>({isQuestion:true, isUser:false, message:data.title})))
    const [isThinking, setIsThinking] = useState(false);

    const selectTitle = (msg:{isQuestion:boolean, isUser:boolean,message:string}) =>{
        const found = dataList.find(f=>f.title==msg.message);
        setMessages(m=>([{isQuestion:true, isUser:true,message:msg.message},...m]));

        console.log("clicked");


        if (found){
            const ss = setTimeout(() => {
                setMessages(m=>([{isQuestion:false, isUser:false,message:found.description},...m]));
                clearTimeout(ss);
            }, 1000);
        }

    }

    return (
        <div className='p-4 h-full flex flex-col-reverse space-y-1.5 space-y-reverse overflow-x-auto bg-slate-200 rounded-bl-sm rounded-br-sm'>
            {
            (messages).map(msg =>
                <button key={Math.floor(Math.random())} onClick={() => msg.isQuestion?selectTitle(msg):null}
                    className={cn('w-fit max-w-md text-left', msg.isUser && 'ml-auto w-fit max-w-md text-left')}>
                    <p className={cn('p-4 rounded-lg bg-white hover:bg-gray-100 dark:invert', msg.isUser && 'bg-blue-200')}>{msg.message}</p>
                </button>)
            }
        </div>
    );
}
