import React, { FC, useState, useEffect, Fragment, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useSettings } from '@/Hooks/useSettings'
import { Label } from '../ui/label'
import { ModeToggle } from '../ModeToggle'
import { APP_NAME } from '@/Pages/Welcome'
import { useChatbotModal } from '@/Hooks/useChatbotModal'
import { cn } from "@/lib/utils"
import { Bot } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area'
import { useChatScroll } from '@/Hooks/useChatScroll'

const ChatModal:FC = () => {
    const {isOpen,onClose} = useChatbotModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='text-lg font-medium'>Koji Bot</span>
                    </DialogTitle>
                </DialogHeader>
                <RenderData />
            </DialogContent>
        </Dialog>
    )
}

export default ChatModal

const RenderData:FC = () => {

    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const dataList = [
        {
            title: 'Hello, Welcome to your personal stress assessment chatbot.',
            description: "",
            isOptions: false
        },
        {
            title: 'Great to have you here! To ensure we gather comprehensive and reliable data for your stress assessment, our assessment is divided into two parts',
            description: "",
            isOptions: false
        },
        {
            title: "Part 1: You'll answer 10 brief questions to provide an initial assessment of your stress level",
            description: "",
            isOptions: false
        },
        {
            title: "Part 2: The more in-depth assessment consists of 30 questions to further refine the data.",
            description: "",
            isOptions: false
        },
        {
            title: "Are you ready to take your stress assessment with me?",
            description: "",
            isOptions: false
        },
        {
            title: "Yes, I'm ready!",
            description: "",
            isOptions: true
        }];

    const [messages, setMessages] = useState(dataList.map(data=>({isOptions:true, isUser:false, message:data.title})))

    const selectTitle = (msg:{isOptions:boolean,isUser:boolean,message:string}) =>{
        const found = dataList.find(f=>f.title==msg.message);
        
        setMessages(m=>([...m,{isOptions:false,isUser:true,message:msg.message}]));

        console.log(found);
        
        if (found){
            const ss = setTimeout(() => {
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:found.description}]));
                setMessages(m=>([...m,{isOptions:true,isUser:false,message:"menu"}]));
                clearTimeout(ss);
            }, 1000);
        }else{
            const ss = setTimeout(() => {
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Sorry, I did not get that"}]));
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

    useChatScroll({
        chatRef,bottomRef,count:messages.length
    });

    return (
        <ScrollArea ref={chatRef}  className='text-sm h-full max-h-[20rem]'>
            <div  className='py-2 flex flex-col overflow-y-auto space-y-1.5 space-y-reverse'>
                {
                (messages).map(msg =>
                        <Fragment key={Math.floor(Math.random()*9999)}>
                            {!msg.isOptions?<p
                                className={cn('w-fit max-w-md p-4 rounded-lg dark:invert shadow',
                                                msg.isUser?'ml-auto bg-blue-200':'bg-white')}>
                                {msg.message}
                            </p>
                            :
                            <button onClick={() => (msg.message!="menu")?selectTitle(msg):loadMenu()}
                                className='shadow text-blue-600 text-sm w-fit max-w-md text-left rounded-full px-4 py-1 dark:invert border border-blue-300'>
                                    {msg.message}
                            </button>}
                        </Fragment>
                        )
                }

            </div>
            <div ref={bottomRef} />
        </ScrollArea>
    );
}
