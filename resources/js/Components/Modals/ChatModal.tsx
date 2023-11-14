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
import { usePage, router } from '@inertiajs/react';
import { PageProps, Result } from '@/types';

const ChatModal:FC = () => {
    const {isOpen,onClose} = useChatbotModal();
    const {test_taken_this_month} = usePage<PageProps>().props;

    useEffect(()=>{
        console.log(test_taken_this_month);
    }, [test_taken_this_month]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-gradient-to-b from-[#DDEDEA] via-[#DAEAFF] to-[#E8DFF5] dark:text-gray-900'>
                <DialogHeader>
                    <DialogTitle className='flex border-b pb-2.5 dark:text-gray-900'>
                        <Bot className='mr-2'/>
                        <span className='text-lg font-medium'>Koji Bot</span>
                    </DialogTitle>
                </DialogHeader>
                <RenderData is_done={test_taken_this_month}/>
            </DialogContent>
        </Dialog>
    )
}

export default ChatModal

const RenderData:FC<{is_done:any}> = (is_done) => {

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

            const answerLevel:number = +msg.message.split("-")[0];

            // PSS QUESTION WAS FINISHED
            if ((qcounter-1) < 11) {
                switch (qcounter-1) {
                    case 4: case 5: case 7: case 8:
                        setTest1([...test1,{id:(qcounter-1),answer:convertScoreTest1(answerLevel)}]);
                        break;
                    default:
                        setTest1([...test1,{id:(qcounter-1),answer:answerLevel}]);
                        break;
                }
            }else{
                switch (qcounter-11) {
                    case 1: case 7: case 10: case 13: case 17: case 21: case 25: case 29:
                        setTest2([...test2,{id:(qcounter-11),answer:convertScoreTest2(answerLevel)}]);
                        break;
                    default:
                        setTest2([...test2,{id:(qcounter-11),answer:answerLevel}]);
                        break;
                }
            }

            if (qcounter == 11) {
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"First part of test was completed"}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Second part is about to start"}]));
            }

            if (qcounter == 41) {
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
        // console.log(pss_choices);
        // console.log(pss_questions);
        // console.log(questionnaire_choices);
        // console.log(questionnaire_questions);
        console.log(is_done.is_done);
        
    },[]);

    useEffect(()=>{
        if (qcounter == 41) {
            var sum1 = getSum(test1);
            var sum2 = getSum(test2);

            var secondTestResult = (sum2-30) / 90
            var sumResult = Math.abs(secondTestResult).toFixed(2);

            console.log(sumResult);

            setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Your overall score is " + sumResult}]));

            var stressResult = "";
            if (sum1 >= 0 && sum1 <= 13) {
                stressResult = "You are having very low stress and doing well as of the moment. You are managing and handling stress appropriately.";
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"You are having very low stress and doing well as of the moment. You are managing and handling stress appropriately."}]));
            }else if (sum1 >= 14 && sum1 <= 26) {
                stressResult = "You are having a normal level of stress. Continue the positive coping strategies and stress management techniques that you are doing.";
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"You are having a normal level of stress. Continue the positive coping strategies and stress management techniques that you are doing."}]));
            } else {
                stressResult = "You are having a high level of stress. You need to improve your coping strategies and stress management techniques. You need to slow down and take a break from any stress related activities, interactions and engagements.";
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"You are having a high level of stress. You need to improve your coping strategies and stress management techniques. You need to slow down and take a break from any stress related activities, interactions and engagements."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"You can also consider the following alternatives. You need to seek help from your social support system like friends, colleagues, or family. Consider seeking professional help and doing counseling and psychotherapy. You need to adjust your daily activities and prioritize self-care  whether its physical, mental, emotional, spiritual, and social."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Here are also some hotlines that we suggest that can help you if you ever want to talk to someone:"}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Hopeline Philippines:\nHotline: 2919 (for Globe and TM subscribers) or 804-HOPE (4673)\nAvailable 24/7\nHopeline Philippines is a crisis hotline that provides emotional support and intervention for individuals who are going through a difficult time, including students facing stress or mental health challenges."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"The Natasha Goulbourn Foundation (NGF) Hopeline:\nHotline: (02) 8804-HOPE (4673) or 0917-558-HOPE (4673)\nAvailable 24/7\nNGF Hopeline is a mental health crisis hotline in partnership with the Department of Health (DOH) that offers support, information, and intervention for those in crisis."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Silakbo PH:\nFacebook Page: Silakbo PH\nSilakbo PH is a community-driven initiative in the Philippines that provides a safe space for individuals to share their mental health experiences and receive support and information."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Mental Health PH:\nWebsite: Mental Health PH\nMental Health PH is a website that provides information, resources, and support for mental health concerns. They have a directory of mental health professionals and facilities in the Philippines."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"Crisis Line Philippines (CLiP):\nHotline: 0917-899-8727 or 989-8727\nAvailable 24/7\nCLiP offers a helpline for crisis intervention, emotional support, and referrals to mental health professionals."}]));
                setMessages(m=>([...m,{isOptions:false,isUser:false,message:"In Touch Community Services\nHotline: (02) 8893-7603\nAvailable Mon to Fri, 9:00 AM to 5:00 PM\nIn Touch Community Services provides a crisis line for emotional support and assistance, as well as information and referrals for mental health services."}]));
            }

            router.post(route('chatbot.store', {'description':sumResult, 'remarks':stressResult}));
        }
    },[test2]);

    const getSum = (test:any) => {
        let sum = 0;
        for (let i = 0; i < test.length; i++) {
            sum += test[i].answer;
        }
        return sum;
    }

    return (
        <ScrollArea ref={chatRef}  className='text-sm h-full max-h-[30rem] px-4'>
            <div  className='py-2 flex flex-col overflow-y-auto space-y-1.5'>
                {
                (is_done.is_done==false)?
                    (messages).map((msg, index) =>
                    <Fragment key={index}>
                        {!msg.isOptions?
                        <p
                            className={cn('whitespace-pre-line w-fit max-w-md p-4 rounded-lg shadow text-gray-900',
                                            msg.isUser?'ml-auto bg-blue-300':'bg-white')}>
                            {msg.message}
                        </p>
                        :
                        <button onClick={() => (msg.message!="menu")?selectTitle(msg):loadMenu()}
                            className='text-sm w-fit max-w-md text-left rounded-2xl px-4 py-1.5 shadow border border-blue-500 bg-blue-300 text-gray-900'>
                                {msg.message}
                        </button>}
                    </Fragment>
                    )
                :
                    <p className='dark:text-gray-700 text-center'>You can only take this test once a month</p>
                }

            </div>
            <div ref={bottomRef} />
        </ScrollArea>
    );
}
