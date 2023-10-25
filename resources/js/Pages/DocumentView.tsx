import Cover from '@/Components/DocumentViewComponents/Cover'
import Spinner from '@/Components/Spinner'
//import Editor from '@/Components/Editor'
import ToolBar from '@/Components/ToolBar'
import DocumentsLayout from '@/Layouts/DocumentsLayout'
import { Document, PageProps } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {FC, lazy, useEffect, useState} from 'react'


const Editor = lazy(() => import('@/Components/Editor'));

const DocumentView:FC = () => {
    const {selected_document} = usePage<PageProps>().props;
    
    const onChange = (content:string) =>{
        
        const {id} = selected_document!;
        router.post(route('documents.update',{id}),{
            content
        },{
            preserveState:true
        });
        
    }
    //if(!selected_document) return null;
    return (
        <>
            <Head title='Documents' />
            <DocumentsLayout  >
                <div className='pb-40'>
                    <Cover document={selected_document} />
                    <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                        <ToolBar initialData={selected_document!} />
                        <Editor document={selected_document!} onChange={onChange} />
                    </div>
                </div>
            </DocumentsLayout>
        </>
    )
}

export default DocumentView