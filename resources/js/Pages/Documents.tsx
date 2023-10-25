import { Button } from '@/Components/ui/button';
import DocumentsLayout from '@/Layouts/DocumentsLayout'
import { Document, PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react';
import {FC,useEffect} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';



const Documents:FC = () => {
    const user = usePage<PageProps>().props.auth.user;
    const handleCreate = () =>{
        router.post(route('documents.store'),{
            title:`Koji: ${format(new Date(),'Pp')}`
        },{
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }

    return (
        <>
            <Head title='Documents' />
            <DocumentsLayout >
                <div className='h-full flex flex-col items-center justify-center space-y-3.5'>
                    <img alt='Empty' height={300} width={300} className='dark:invert' src={`${route('welcome')}/images/empty.png`} />
                    <h2 className='text-lg font-medium'>Welcome to {user.name}&apos;s {APP_NAME}</h2>
                    <Button onClick={handleCreate}>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        <span>
                            Create a KOJI
                        </span>
                    </Button>
                </div>
            </DocumentsLayout>
        </>
    )
}

export default Documents