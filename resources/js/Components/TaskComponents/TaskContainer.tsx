import { Task } from '@/types'
import React, { FC, MouseEventHandler, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import {  CheckCheckIcon, Edit, MoreHorizontal, PlusSquare, Trash2 } from 'lucide-react';

import TaskListItem from './TaskListItem';

interface TaskContainerProps{
    tasks:Task[];
    className?:string;
}

const TaskContainer:FC<TaskContainerProps> = ({tasks,className}) => {

    

    return (
        <>
            <div className={cn('px-3.5 bg-background/70 overflow-x-hidden',className)}>
                <Accordion type="single" defaultValue={tasks[0].id.toString()} collapsible className="w-full">
                    {tasks.map(task=><TaskListItem key={task.id} task={task} />)}
                </Accordion>
            </div>
        </>
    )
}

export default TaskContainer;
