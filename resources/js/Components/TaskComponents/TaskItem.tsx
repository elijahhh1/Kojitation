import { TaskIndividualItem } from '@/types'
import React, { FC, useState } from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props{
    item:TaskIndividualItem;
}

const TaskItem:FC<Props> = ({item}) => {
    const {id,is_completed,updated_at,name} = item;
    const [loading,setLoading] = useState(false);

    const onComplete =()=>{
        setLoading(true);
        router.post(route('task_list.update',{id}),{
            is_completed:1
        },{
            onFinish:()=>setLoading(false),
            onSuccess:()=>toast.success('Task Completed'),
            onError:()=>toast.error('Something Went Wrong. Please Try again')
        })
    }

    const onDelete =()=>{
        setLoading(true);
        router.post(route('task_list.destroy',{id}),{},{
            onFinish:()=>setLoading(false),
            onSuccess:()=>toast.success('Task Deleted'),
            onError:()=>toast.error('Something Went Wrong. Please Try again')
        })
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
                <Badge  variant={is_completed===1?'default':'outline'}>
                    {`${is_completed===1?'Completed':'Pending'}`}
                </Badge>
            </TableCell>
            <TableCell>{is_completed===1&& <span>{format(new Date(updated_at),'PPp')}</span>}</TableCell>
            <TableCell className='flex items-center justify-end space-x-1.5'>
                <Button disabled={loading} onClick={onComplete} size='sm' variant='outline'
                    className={cn('border-green-500 dark:border-green-400', (is_completed===1)?'hidden':'')}>
                    Complete
                </Button>
                <Button disabled={loading} onClick={onDelete} size='sm' variant='destructive'>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default TaskItem
