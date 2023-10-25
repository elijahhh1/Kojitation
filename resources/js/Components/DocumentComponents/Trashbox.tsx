import React, { FC,  MouseEvent,  useMemo, useState } from 'react'
import { PageProps } from '../../types/index';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Search, Trash, Undo } from 'lucide-react';
import { Input } from '../ui/input';
import ConfirmModal from '../Modals/ConfirmModal';



const Trashbox:FC = () => {
    const {selected_document} = usePage<PageProps>().props;
    const {archives} = usePage<PageProps>().props
    const [filter,setFilter] = useState("");
    const filteredDocs = useMemo(()=>archives.filter(({title})=>title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())),[filter,archives]);

    const onClick = (id:number) => router.get(route('documents.show',{id}));
    const onRestore = (e:MouseEvent<HTMLDivElement, globalThis.MouseEvent>,id:number) => {
        e.stopPropagation();
        router.post(route('documents.restore',{id}),{},{
            onSuccess:()=>toast.success('Restore successfull'),
            onError:()=>toast.error('Something Went Wrong. Please try again...')
        });
        
    };

    const onPermaDelete = (id:number) => {
        router.post(route('documents.permanent_destroy',{id}),{active:selected_document?.id===id},{
            onSuccess:()=>{
                toast.success('Document Permanently Deleted');
            },
            onError:()=>toast.error('Something Went Wrong. Please try again...')
        });
    };
        
    

    return (
        <div className='text-sm'>
            <div className='flex items-center gap-x-1 p-1.5'>
                <Search className='h-4 w-4' />
                <Input value={filter} onChange={({target})=>setFilter(target.value)} className='h-7 px-1.5 bg-secondary' placeholder='Filter by Title...' />
            </div>
            <div className='mt-2 px-1 pb-1'>
                <p className='hidden last:block text-xs text-center pb-2 text-muted-foreground'>No Documents Found...</p>
                {
                    filteredDocs.map(({id,...doc})=>(
                        <div key={id} role='button' onClick={()=>onClick(id)} className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'>
                            <span className='truncate pl-2'>{doc.title}</span>
                            <div className='flex items-center'>
                                <div className='rounded-sm p-2 hover:bg-primary/20' role='button' onClick={e=>onRestore(e,id)}>
                                    <Undo className='h-4 w-4 text-muted-foreground' />
                                </div>
                                <ConfirmModal onConfirm={()=>onPermaDelete(id)}>
                                    <div role='button' className='rounded-sm p-2 hover:bg-primary/20'>
                                        <Trash className='h-4 w-4 text-muted-foreground' />
                                    </div>
                                </ConfirmModal>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Trashbox