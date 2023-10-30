import { cn } from '@/lib/utils';
import { Document, PageProps } from '@/types';
import {FC,useState,useEffect, useMemo} from 'react'
import Item from './Item';
import { CheckCircle, CheckCircle2, FileIcon } from 'lucide-react';
import { router, usePage, useRemember } from '@inertiajs/react';
import { Switch } from '../ui/switch';

interface Props{
    parentDocumentId?:number;
    level?:number;
    documents?:Document[];
}

const DocumentList:FC<Props> = ({parentDocumentId,level=0,documents}) => {
    const [showDone,setShowDone] = useState(true);
    const {selected_document} = usePage<PageProps>().props;
    const [expanded,setExpanded] = useState<Record<number,boolean>>({});

    const onExpand = (id:number) =>{
        setExpanded(val=>({...val,[id]:!val[id]}));
    }

    const navigate = (id:number) =>{
        router.get(route('documents.show',{id}),{},{
            preserveScroll:true,
            preserveState:false,
            onFinish:()=>{

            },
        });
    }

    const filteredDocs:Document[]|undefined = useMemo(()=>showDone?documents?.filter(doc=>doc.is_done===1):documents,[documents,showDone]);
    

    return (
        <>
            <div className='flex items-center justify-center space-x-2 '>
                <label htmlFor='switch' className='text-sm font-light'>Show Completed</label>
                <Switch id='switch'  checked={showDone} onCheckedChange={e=>(setShowDone(e))} />
            </div>
            <p style={{ paddingLeft: level >0? `${(level*0.75)+1.563}rem` :undefined }} className={cn('hidden text-sm font-medium text-muted-foreground/80',
                expanded && 'last:block',
                level===0&&'hidden'
            )}>No Pages Inside...</p>
            {
                filteredDocs?.map(({id,...document})=>(
                    <div key={id}>
                        
                        <Item
                            isDone={document.is_done===1}
                            id={id} 
                            onClick={()=>navigate(id)}
                            label={document.title}
                            Icon={ document.is_done? CheckCircle : FileIcon  }
                            documentIcon={document.icon}
                            active={selected_document?.id===id}
                            level={level}
                            onExpand={()=>onExpand(id)}
                            expanded={expanded[id]}
                            updateDate={new Date(document.updated_at)}
                            />
                        {
                            expanded[id] && <DocumentList parentDocumentId={id} level={level+1}  documents={document.documents} />
                        }
                    </div>
                ))
            }
        </>
    )
}

export default DocumentList


