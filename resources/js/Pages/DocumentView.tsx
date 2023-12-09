import Cover from '@/Components/DocumentViewComponents/Cover'
import Spinner from '@/Components/Spinner'
//import Editor from '@/Components/Editor'
import ToolBar from '@/Components/ToolBar'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import DocumentsLayout from '@/Layouts/DocumentsLayout'
import { Document, PageProps } from '@/types'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { SaveIcon } from 'lucide-react'
import {ChangeEventHandler, FC, FocusEventHandler, FormEventHandler, lazy, useEffect, useRef, useState} from 'react'


const Editor = lazy(() => import('@/Components/Editor'));

const DocumentView:FC = () => {
    const {selected_document} = usePage<PageProps>().props;
    const formRef = useRef<HTMLFormElement>(null);
    const {data,setData,reset,processing,errors,post} = useForm({
        grateful1:selected_document?.gratefuls[0]?.title||"",
        grateful2:selected_document?.gratefuls[1]?.title||"",
        grateful3:selected_document?.gratefuls[2]?.title||"",
        happenings_today1:selected_document?.happenings[0]?.title||"",
        happenings_today2:selected_document?.happenings[1]?.title||"",
        happenings_today3:selected_document?.happenings[2]?.title||"",
        favorite_moment:selected_document?.favorite_moment||"",
        looking_forward_to:selected_document?.looking_forward_to||""
    });


    const onChange:ChangeEventHandler<HTMLInputElement> = ({target}) =>{
        type ID = keyof typeof data;
        const {id,value}=target as unknown as  {id:ID;value:string;};
        setData(id,value);
    }

    const onBlur:FocusEventHandler<HTMLInputElement> = (e) =>{
        if(!formRef.current) return;
        formRef.current?.requestSubmit();
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        if(!selected_document) return;
        e.preventDefault();
        post(route('documents.update',{id:selected_document.id}));
    }

    return (
        <>
            <Head title='Documents' />
            <DocumentsLayout  >
                <div className='pb-10'>
                    <Cover document={selected_document} />
                    <form onSubmit={onSubmit} ref={formRef}>
                        <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                            <ToolBar initialData={selected_document!} />
                            <div className='flex flex-col gap-y-3.5 mt-10'>
                                <div className='flex flex-col space-y-2.5 md:flex-row md:space-x-2.5 md:space-y-0 w-full items-center justify-center md:justify-between'>
                                    <div className='w-full md:w-1/2 border border-fuchsia-200 bg-fuchsia-50 dark:border-slate-700 dark:bg-slate-900 rounded-lg px-4 py-6'>
                                        <p className='text-center text-lg tracking-tight font-semibold pb-6 text-primary'>3 Things I Am Grateful For Today</p>
                                        <div className='flex flex-col space-y-2.5'>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='grateful1' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='grateful1' value={data.grateful1} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-fuchsia-100 dark:bg-slate-800 disabled:opacity-50' />
                                            </div>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='grateful2' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='grateful2' value={data.grateful2} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-fuchsia-100 dark:bg-slate-800 disabled:opacity-50' />
                                            </div>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='grateful3' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='grateful3' value={data.grateful3} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-fuchsia-100 dark:bg-slate-800 disabled:opacity-50' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full md:w-1/2 border border-indigo-200 bg-indigo-50 dark:border-neutral-600 dark:bg-neutral-900 rounded-lg px-4 py-6'>
                                        <p className='text-center text-lg tracking-tight font-semibold pb-6'>3 Good Things That Happened Today</p>
                                        <div className='flex flex-col space-y-2.5'>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='happenings_today1' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='happenings_today1' value={data.happenings_today1} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-indigo-100 dark:bg-neutral-800 disabled:opacity-50' />
                                            </div>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='happenings_today2' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='happenings_today2' value={data.happenings_today2} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-indigo-100 dark:bg-neutral-800 disabled:opacity-50' />
                                            </div>
                                            <div className='flex items-end space-x-1.5'>
                                                <Label htmlFor='happenings_today3' className='text-lg leading-none'></Label>
                                                <input onBlur={onBlur} id='happenings_today3' value={data.happenings_today3} onChange={onChange}
                                                    className='w-full rounded p-1.5 border-b-2 bg-indigo-100 dark:bg-neutral-800 disabled:opacity-50' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-10'>
                                    <div className='px-4 py-6 rounded bg-rose-100 border border-rose-300 dark:bg-[#170129] dark:border-[#42017a] mb-6'>
                                        <p className='w-full text-center text-lg tracking-tight font-semibold pb-2'>My Favorite Moment of the Day</p>
                                        <input onBlur={onBlur} id='favorite_moment' value={data.favorite_moment} onChange={onChange}
                                            className='w-full rounded p-1.5 border-b-2 bg-rose-200 dark:bg-[#21112f] disabled:opacity-50' />
                                    </div>
                                    <div className='px-4 py-6 rounded bg-cyan-50 border border-cyan-300 dark:bg-[#35122f] dark:border-[#2f132a] mb-6'>
                                        <p className='w-full text-center text-lg tracking-tight font-semibold pb-2'>Tomorrow, I Look Forward To</p>
                                        <input onBlur={onBlur} id='looking_forward_to' value={data.looking_forward_to} onChange={onChange}
                                            className='w-full rounded p-1.5 border-b-2 bg-cyan-100 dark:bg-[#290f25] disabled:opacity-50' />
                                    </div>
                                </div>

                            </div>

                            <div className='pt-20 w-full flex'>
                                <Button size='lg' className='ml-auto font-bold text-2xl'>
                                    <SaveIcon className='w-6 h-6 mr-2' />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>

                </div>
            </DocumentsLayout>
        </>
    )
}

export default DocumentView
