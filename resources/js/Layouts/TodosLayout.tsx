import Navigation from '@/Components/DocumentComponents/Navigation';
import ModalProvider from '@/Components/Providers/ModalProvider';
import SearchCommand from '@/Components/SearchCommand';
import  { ReactNode,FC,useEffect } from 'react'

interface TodosLayoutProps{
    children:ReactNode;
}

const TodosLayout:FC<TodosLayoutProps> = ({children}) => {
    return (
        <>
            <SearchCommand />
            <div className='h-full flex '>
                <Navigation />
                <main className='flex-1 h-full overflow-y-auto'>
                    {children}
                </main>
            </div>
            <ModalProvider />
        </>
    )
}

export default TodosLayout
