import { useSearch } from '@/Hooks/useSearch'
import React, { useEffect } from 'react'
import { CommandDialog, CommandInput,CommandEmpty, CommandList, CommandGroup, CommandItem  } from './ui/command';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { File } from 'lucide-react';
import { APP_NAME } from '@/Pages/Welcome';

const SearchCommand = () => {

    const {toggle,isOpen,onClose} = useSearch();
    const {documents} = usePage<PageProps>().props;
    const onSelect = (id:number) =>{
        router.get(route('documents.show',{id}));
        onClose();
    }

    useEffect(()=>{
        const down = (e:KeyboardEvent) =>{
            if(e.key==='k' && (e.metaKey||e.ctrlKey)){
                e.preventDefault();
                toggle();
            }
        }
        document.addEventListener('keydown',down);
        return ()=>document.removeEventListener('keydown',down);
    },[]);

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${APP_NAME}...`} />
            <CommandList>
                <CommandEmpty>No Documents Found...</CommandEmpty>
                <CommandGroup heading='Documents'>
                    {
                        documents.map(({id,...doc})=> (
                            <CommandItem onSelect={()=>onSelect(id)} key={id} value={`${id.toString()}-${doc.title}`}>
                                {doc.icon?<p className='mr-2 text-[1.125rem]'>{doc.icon}</p>:<File className='mr-2 h-4 w-4' /> }
                                <span>{doc.title}</span>
                            </CommandItem>
                        )
                    )}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export default SearchCommand