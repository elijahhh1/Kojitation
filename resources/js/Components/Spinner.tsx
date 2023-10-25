import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority'
import { Loader } from 'lucide-react';
import  { FC } from 'react'

const spinnerVariants = cva(
    'text-muted-foreground animate-spin',{
        variants:{
            size:{
                'default':'h-4 w-4',
                'sm':'h-2 w-2',
                'lg':'h-6 w-6',
                'icon':'h-10 w-10'
            }
        },
        defaultVariants:{
            size:'default'
        }
    }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants>{
    className?:string;
}

const Spinner:FC<SpinnerProps> = ({size,className}) => {
    return (
        <div className={className}>
            <Loader className={cn(spinnerVariants({size}))} />
        </div>
    )
}

export default Spinner