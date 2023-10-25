import React, { FC, ReactNode } from 'react';
import { useTheme } from './Providers/ThemeProvider';
import EmojiPicker,{Theme} from 'emoji-picker-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface IconPickerProps{
    onSelect:(icon:string)=>void;
    children:ReactNode;
    asChild?:boolean;
}

const IconPicker:FC<IconPickerProps> = ({onSelect,children,asChild}) => {
    const { theme } = useTheme();
    const currentTheme:Theme = theme==='light'? Theme.LIGHT: theme==='dark'? Theme.DARK:Theme.AUTO; 
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className='p-0 w-full border-none shadow-none'>
                <EmojiPicker height={350} theme={currentTheme} onEmojiClick={({emoji})=>onSelect(emoji)} />
            </PopoverContent>
        </Popover>
    )
}

export default IconPicker