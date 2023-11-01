import ChatbotLayout from '@/Layouts/ChatbotLayout';
import { Document } from '@/types'
import { Head } from '@inertiajs/react';
import {FC, useState, useEffect} from 'react'
import { Bot } from 'lucide-react';
import { log } from 'console';
import { cn } from "@/lib/utils"
import { setSeconds } from 'date-fns';
import Title from '../Components/DocumentViewComponents/Title';

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
                            <header className='px-4 flex items-center h-14 w-full bg-blue-200 rounded-tl-sm rounded-tr-sm'>
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

    const [messages, setMessages] = useState(dataList.map(data=>({isOptions:true, isUser:false, message:data.title})))
    const [isThinking, setIsThinking] = useState(false);

    const selectTitle = (msg:{isOptions:boolean,isUser:boolean,message:string}) =>{
        const found = dataList.find(f=>f.title==msg.message);
        setMessages(m=>([{isOptions:false,isUser:true,message:msg.message},...m]));

        if (found){
            const ss = setTimeout(() => {
                setMessages(m=>([{isOptions:false,isUser:false,message:found.description},...m]));
                setMessages(m=>([{isOptions:true,isUser:false,message:"menu"},...m]));
                clearTimeout(ss);
            }, 1000);
        }else{
            const ss = setTimeout(() => {
                setMessages(m=>([{isOptions:false,isUser:false,message:"Sorry, I did not get that"},...m]));
                clearTimeout(ss);
            }, 1000);
        }
    }

    const loadMenu = () => {
        const ss = setTimeout(() => {
            const newMessages = dataList.map(data => ({ isOptions: true, isUser: false, message: data.title }));
            setMessages([...newMessages,...messages]);
            clearTimeout(ss);
        }, 1000);
    }

    return (
        <div className='p-4 h-full flex flex-col-reverse space-y-1.5 space-y-reverse overflow-x-auto bg-blue-50 rounded-bl-sm rounded-br-sm'>
            {
            (messages).map(msg =>
                !msg.isOptions?
                <p key={Math.floor(Math.random()*9999)}
                    className={cn('w-fit max-w-md p-4 rounded-lg dark:invert shadow',
                                    msg.isUser?'ml-auto bg-blue-200':'bg-white')}>
                    {msg.message}
                </p>
                :
                <button key={Math.floor(Math.random()*9999)} onClick={() => (msg.message!="menu")?selectTitle(msg):loadMenu()}
                    className='shadow text-blue-600 text-sm w-fit max-w-md text-left rounded-full px-4 py-1 dark:invert border border-blue-300'>
                        {msg.message}
                </button>
                )
            }
        </div>
    );
}
