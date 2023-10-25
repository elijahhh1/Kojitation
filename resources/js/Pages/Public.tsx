import Cover from '@/Components/DocumentViewComponents/Cover';
import Editor from '@/Components/Editor';
import ToolBar from '@/Components/ToolBar';
import { Document } from '@/types'
import { Head } from '@inertiajs/react';
import {FC} from 'react'

interface Props{
    document:Document;
}

const Public:FC<Props> = ({document}) => {
    return (
        <>
            <Head title={document.title} />
            <div className='pb-40'>
                <Cover preview document={document} />
                <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                    <ToolBar preview initialData={document!} />
                    <Editor editable={false} document={document} onChange={()=>{}} />
                </div>
            </div>
        </>
    )
}

export default Public