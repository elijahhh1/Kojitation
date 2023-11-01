import { MenuIcon } from 'lucide-react';
import React, { FC } from 'react'
import Title from './Title';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Banner from './Banner';
import Menu from './Menu';
import Publish from './Publish';

interface Props{
    isCollapsed:boolean;
    onResetWidth:()=>void
}

const NavBar:FC<Props> = ({isCollapsed,onResetWidth}) => {
    const {selected_document} = usePage<PageProps>().props;

    if (!selected_document) return null;
    return (
        <>
            <nav className='bg-background dark:bg-background/90 px-2.5 py-1.5 w-full flex items-center gap-x-3.5'>
                {isCollapsed&&<MenuIcon role='button' onClick={onResetWidth} className='w-6 h-6 text-muted-foreground' />}
                <div className='flex items-center justify-between w-full'>
                    <Title initialData={selected_document} />
                    <div className='flex items-center gap-x-2'>
                        {/* <Publish document={selected_document} /> */}
                        <Menu updateDate={new Date(selected_document.updated_at)} id={selected_document.id} />
                    </div>
                </div>
            </nav>
            {selected_document.is_archived===1 && <Banner id={selected_document.id} />}
        </>
    )
}

export default NavBar
