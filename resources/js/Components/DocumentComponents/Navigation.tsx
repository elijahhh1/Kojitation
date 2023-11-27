import { cn } from '@/lib/utils';
import { ChevronLeft, MenuIcon, Plus, PlusCircle, Recycle, Search, Settings, LineChart, CalendarCheck2, Video, Bot, ClipboardList, HelpCircle, Send, Book } from 'lucide-react'
import React, { ElementRef, FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import {useMediaQuery}  from 'usehooks-ts';
import UserNav from '../UserNav';
import UserItem from './UserItem';
import Item from './Item';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import DocumentList from './DocumentList';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Trashbox from './Trashbox';
import { useSearch } from '@/Hooks/useSearch';
import { useSettings } from '@/Hooks/useSettings';
import { useChatbotModal } from '@/Hooks/useChatbotModal';
import { useFAQModal } from '@/Hooks/useFAQModal';
import NavBar from '../DocumentViewComponents/NavBar';
import { format } from 'date-fns';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSendFeedbackModal } from '@/Hooks/useSendFeedback';
const Navigation:FC = () => {


    const {selected_document} = usePage<PageProps>().props;
    const {documents} = usePage<PageProps>().props;
    const user = usePage<PageProps>().props.auth.user;

    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<'aside'>>(null);
    const navBarRef = useRef<ElementRef<'div'>>(null);
    const [isResetting,setIsResetting] = useState(false);
    const [isCollapsed,setIsCollapsed] = useState(isMobile);
    const {onOpen} = useSearch();
    const {onOpen:openSettings} = useSettings();
    const {onOpen:openChat} = useChatbotModal();
    const {onOpen:openFAQ} = useFAQModal();
    const {onOpen:openSendFeedback} = useSendFeedbackModal();

    const handleMouseDown:MouseEventHandler<HTMLDivElement> = e =>{
        e.preventDefault();
        e.stopPropagation();



        isResizingRef.current=true;
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);

    }

    const handleMouseMove = (e:MouseEvent) =>{
        if(!isResizingRef.current) return;
        let newWidth = e.clientX;
        if(newWidth < 240) newWidth = 240;
        if(newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navBarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty('left', `${newWidth}px`);
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth})px`)
        }

    }

    const handleMouseUp = () =>{
        isResizingRef.current=false;
        document.removeEventListener('mousemove',handleMouseMove);
        document.removeEventListener('mouseup',handleMouseUp);
    }

    const resetWidth = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsResetting(true);
            setIsCollapsed(false);
            sidebarRef.current.style.width = isMobile? '100%' : '15rem';
            navBarRef.current.style.setProperty('width',isMobile? '0' : 'calc(100% - 15rem)');
            navBarRef.current.style.setProperty('left',isMobile? '100%':'15rem');

            setTimeout(()=>setIsResetting(false),300);
        }
    }

    const collapse = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width='0px';
            navBarRef.current.style.setProperty('width','100%');
            navBarRef.current.style.setProperty('left','0');
            setTimeout(()=>setIsResetting(false),300);
        }
    }

    useEffect(()=>{
        if (isMobile) collapse();
        else resetWidth();
    },[isMobile]);

    const handleCreate = () =>{
        router.post(route('documents.store'),{
            title:`Gratitude Journal: ${format(new Date(),'Pp')}`
        },{
            preserveScroll:true,
            preserveState:false,
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }

    const handleCreateTODO = () =>{

    }

    return (
        <>
            <aside ref={sidebarRef} className={cn('group/sidebar max-h-screen overflow-hidden h-full overflow-y-auto relative flex flex-col w-60 z-[100000] bg-slate-100 dark:bg-zinc-950',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'w-0'
                    )}>
                <div onClick={collapse} role='button' className={cn('h-6 w-6 text-muted-foreground rounded-sm hover:text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ',
                        isMobile && 'opacity-100'
                    )}>
                    <ChevronLeft className='h-6 w-6' />
                </div>
                <div>
                    <UserItem />
                    <Item onClick={()=>router.get(route('dashboard.index'))} label='Dashboard' Icon={LineChart} iconColor='text-[#f72585] dark:text-[#FCE1E4]' fontColor='text-gray-700 dark:text-[#FCE1E4]'/>
                    {
                        user.level==0?
                        <>
                        <Item onClick={()=>router.get(route('mood.index'))} label='Mood Calendar' Icon={CalendarCheck2}  iconColor='text-[#b5179e] dark:text-[#DAEAFF]' fontColor='text-gray-700 dark:text-[#DAEAFF]'/>
                        <Item onClick={()=>router.get(route('tasks.index'))} label='Task Manager' Icon={ClipboardList} iconColor='text-[#7209b7] dark:text-[#E8DFF5]' fontColor='text-gray-700 dark:text-[#E8DFF5]'/>
                        <Item onClick={()=>router.get(route('videos.index'))} label={`Videos`} Icon={Video} iconColor='text-[#560bad] dark:text-[#DDEDEA]' fontColor='text-gray-700 dark:text-[#DDEDEA]'/>
                        <Item onClick={openChat} label='Chatbot' Icon={Bot}  iconColor='text-[#480ca8] dark:text-[#ECD8A0]' fontColor='text-gray-700 dark:text-[#ECD8A0]'/>
                        </>
                        :
                        <></>
                    }
                    <div className='border-b border-b-[#e3e3e3] dark:border-b-[#202020] my-2' />
                    {
                        user.level==0?
                        <>
                            <Item onClick={openFAQ} label='FAQs' Icon={HelpCircle} iconColor='text-[#3a0ca3] dark:text-[#FCE1E4]' fontColor='text-gray-700 dark:text-[#FCE1E4]'/>
                            <Item onClick={openSendFeedback} label='Send Feedback' Icon={Send} iconColor='text-[#3f37c9] dark:text-[#DAEAFF]' fontColor='text-gray-700 dark:text-[#DAEAFF]'/>
                        </>
                        :
                        <></>
                    }
                    <Item onClick={openSettings} label='Settings' Icon={Settings} iconColor='text-[#4361ee] dark:text-[#E8DFF5]' fontColor='text-gray-700 dark:text-[#E8DFF5]'/>
                    <div className='border-b border-b-[#e3e3e3] dark:border-b-[#202020] my-2' />
                    {/* <Item onClick={onOpen} label='Search' Icon={Search} isSearch /> */}
                </div>
                {
                    user.level==0?
                    <div className='flex-1 flex flex-col overflow-hidden'>
                        <div className='px-3 pt-3 pb-2 text-gray-700 dark:text-[#FCE1E4] flex items-center font-medium'>
                            <Book className='h-[1.125rem] w-[1.125rem] mr-2 dark:text-[#FCE1E4]'/>
                            Gratitude Journal
                        </div>
                        <div className='h-auto'>
                            <Popover>
                                <PopoverTrigger className='w-full'>
                                    <Item label='Archives' Icon={Recycle} iconColor='text-[#d55d92] dark:text-[#DAEAFF]' fontColor='text-gray-700 dark:text-[#DAEAFF]'/>
                                </PopoverTrigger>
                                <PopoverContent className='p-0 w-72' side={isMobile?'bottom':'right'}>
                                    <Trashbox />
                                </PopoverContent>
                            </Popover>
                            <Item onClick={handleCreate} Icon={Plus} label='Add new' iconColor='text-[#007f5f] dark:text-[#80b918]' fontColor='text-gray-700 dark:text-[#80b918]'/>
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            <DocumentList documents={documents} />
                        </div>
                    </div>
                    :
                    <></>
                }
                <div onMouseDown={handleMouseDown} onClick={resetWidth}
                    className='hopacity-0 hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 dark:from-[#191308] dark:via-[#DAEAFF] dark:to-[#322a26] right-0 top-0' />
            </aside>
            <div ref={navBarRef} className={cn('absolute top-0 z-[100000] left-60 w-[calc(100%-15rem)]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}>
                {!!selected_document?.id?<NavBar isCollapsed={isCollapsed} onResetWidth={resetWidth} />:(
                    <nav className='bg-transparent px-3 py-2 w-full'>
                        {isCollapsed&& <MenuIcon onClick={resetWidth} className='h-6 w-6 text-muted-foreground' role='button' />}
                    </nav>
                )}

            </div>
        </>
    )
}

export default Navigation
