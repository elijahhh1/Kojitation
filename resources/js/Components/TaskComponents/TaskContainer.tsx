import { Task } from '@/types'
import React, { FC } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface TaskContainerProps{
    tasks:Task[];
    className?:string;
}

const TaskContainer:FC<TaskContainerProps> = ({tasks,className}) => {
    return (
        <div className={className}>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default TaskContainer