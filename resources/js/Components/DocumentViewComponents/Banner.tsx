import { router } from '@inertiajs/react';
import {FC, MouseEvent} from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import ConfirmModal from '../Modals/ConfirmModal';

interface BannerProps{
    id:number;
}

const Banner:FC<BannerProps> = ({id}) => {
    const onRestore = () => {
        router.post(route('documents.restore',{id}),{},{
            onSuccess:()=>toast.success('Restore successfull'),
            onError:()=>toast.error('Something Went Wrong. Please try again...')
        });
        
    };

    const onPermaDelete = () => {
        router.post(route('documents.permanent_destroy',{id}),{active:true},{
            onSuccess:()=>{
                toast.success('Document Permanently Deleted');
            },
            onError:()=>toast.error('Something Went Wrong. Please try again...')
        });
    };
    return (
        <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
            <p>This Page has been Archived</p>
            <Button size='sm' onClick={onRestore} variant='outline' className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white py-1 px-2 h-auto font-normal' >Restore Koji</Button>
            <ConfirmModal onConfirm={onPermaDelete}>
                <Button size='sm' variant='outline' className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white py-1 px-2 h-auto font-normal' >Delete Permanently</Button>
            </ConfirmModal>
        </div>
    )
}

export default Banner