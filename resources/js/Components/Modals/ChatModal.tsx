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
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

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

    const [messageIdCounter, setmessageIdCounter] = useState(1);

    const [messages, setMessages] = useState(dataList.map(data=>({isOptions:data.isOptions, isUser:false, message:data.title})))
    const {pss_choices,pss_questions,questionnaire_choices,questionnaire_questions} = usePage<PageProps>().props;

    const [qcounter, setQcounter] = useState(1);
    
    const [test1, setTest1] = useState<{id:number,answer:number}[]>([]);
    const [test2, setTest2] = useState<{id:number,answer:number}[]>([]);

    const selectTitle = (msg:{isOptions:boolean,isUser:boolean,message:string}) =>{

        setMessages(m=>([...m,{isOptions:false,isUser:true,message:msg.message}]));
        
        if (msg.message == "Yes, I'm ready!") {
            const ss = setTimeout(() => {
                const found = pss_questions.find(f=>f.id==qcounter);
                if (found) {
                    setMessages(m=>([...m,{isOptions:false,isUser:false,message:found.id + " - " + found.question}]));

                    pss_choices.forEach((c, i, cArr)=>{
                        setMessages(m=>([...m,{isOptions:true,isUser:false,message:c.level + " - " + c.choice}]));
                    });

                    setQcounter(qcounter + 1);

                    clearTimeout(ss);
                }
            }, 1000);
        }else{           
            
            // PSS QUESTION WAS FINISHED
            if ((qcounter-1) < 11) {
                const answerLevel:number = +msg.message.split("-")[0];
                switch (qcounter-1) {
                    case 4:
                        setTest1([...test1,{id:(qcounter-1),answer:convertScoreTest1(answerLevel)}]);
                        break;
                    case 5:
                        setTest1([...test1,{id:(qcounter-1),answer:convertScoreTest1(answerLevel)}]);
                        break;
                    case 7:
                        setTest1([...test1,{id:(qcounter-1),answer:convertScoreTest1(answerLevel)}]);
                        break;
                    case 8:
                        setTest1([...test1,{id:(qcounter-1),answer:convertScoreTest1(answerLevel)}]);
                        break;
                    default:
                        setTest1([...test1,{id:(qcounter-1),answer:answerLevel}]);
                        break;
                }
            }else{
                const answerLevel:number = +msg.message.split("-")[0];
                switch (qcounter-1) {
                    case 4:
                        setTest2([...test2,{id:(qcounter-10),answer:convertScoreTest2(answerLevel)}]);
                        break;
                    case 5:
                        setTest2([...test2,{id:(qcounter-10),answer:convertScoreTest2(answerLevel)}]);
                        break;
                    case 7:
                        setTest2([...test2,{id:(qcounter-10),answer:convertScoreTest2(answerLevel)}]);
                        break;
                    case 8:
                        setTest2([...test2,{id:(qcounter-10),answer:convertScoreTest2(answerLevel)}]);
                        break;
                    default:
                        setTest2([...test2,{id:(qcounter-10),answer:answerLevel}]);
                        break;
                }
            }

            console.log(test1);
            console.log(test2);

            if (qcounter == 11) {
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"First part of test was completed"}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Second part is about to start"}]));
            }
    
            if (qcounter == 41) {
                console.log(test1);
                console.log(test2);
    
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Test complete!"}]));
                return;
            }


            if (qcounter < 11) {     
                const found = pss_questions.find(f=>f.id==qcounter);
                if (found) {
                    const ss = setTimeout(() => {
                        setMessages(m=>([...m,{isOptions:false,isUser:false,message:found.id + " - " +found.question}]));
    
                        pss_choices.forEach((c, i, cArr)=>{
                            setMessages(m=>([...m,{isOptions:true,isUser:false,message:c.level + " - " + c.choice}]));
                        });
    
                        setQcounter(qcounter + 1);
                        clearTimeout(ss);
                    });
                }else{
                    const ss = setTimeout(() => {
                        setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Sorry, I did not get that"}]));
                        clearTimeout(ss);
                    }, 1000);
                }

            }else{
                const found = questionnaire_questions.find(f=>f.id==qcounter);
                if (found) {
                    const ss = setTimeout(() => {
                        setMessages(m=>([...m,{isOptions:false,isUser:false,message:(found.id-10) + " - " +found.question}]));
                        
                        questionnaire_choices.forEach((c, i, cArr)=>{
                            setMessages(m=>([...m,{isOptions:true,isUser:false,message:c.level + " - " + c.choice}]));
                        });
    
                        setQcounter(qcounter + 1);
                        clearTimeout(ss);
                    });
                }else{
                    const ss = setTimeout(() => {
                        setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Sorry, I did not get that"}]));
                        clearTimeout(ss);
                    }, 1000);
                }
            }
        }
    }

    const convertScoreTest1 = (score:number):number => {
        switch (score) {
            case 0:
                return 4;
            case 1:
                return 3;
            case 3:
                return 1;
            case 4:
                return 0;
        }
        return score;
    }

    const convertScoreTest2 = (score:number):number => {
        switch (score) {
            case 1:
                return 4;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return 1;
        }
        return score;
    }

    const loadMenu = () => {
        const ss = setTimeout(() => {
            const newMessages = dataList.map(data => ({ isOptions: true, isUser: false, message: data.title }));
            setMessages([...newMessages,...messages]);
            clearTimeout(ss);
        }, 1000);
    }

    const randomMessageId = ():number => {
        setmessageIdCounter(messageIdCounter + 1);
        return messageIdCounter;
    }

    useChatScroll({
        chatRef,bottomRef,count:messages.length
    });

    useEffect(()=>{
        console.log(pss_choices);
        console.log(pss_questions);
        console.log(questionnaire_choices);
        console.log(questionnaire_questions);
    },[]);

    return (
        <ScrollArea ref={chatRef}  className='text-sm h-full max-h-[20rem]'>
            <div  className='py-2 flex flex-col overflow-y-auto space-y-1.5 space-y-reverse'>
                {
                (messages).map((msg, index) => 
                        <Fragment key={index}>
                            {!msg.isOptions?
                            <p
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
