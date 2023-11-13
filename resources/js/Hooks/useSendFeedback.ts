import {create} from 'zustand';

type SendFeedbackStore = {
    isOpen?:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const useSendFeedbackModal = create<SendFeedbackStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))
