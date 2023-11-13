import {create} from 'zustand';

type FaqStore = {
    isOpen?:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const useFAQModal = create<FaqStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))
