
import {create} from 'zustand';


interface IntroModal{
    isOpen?:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}



export const useIntroModal = create<IntroModal>(set=>({
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));
