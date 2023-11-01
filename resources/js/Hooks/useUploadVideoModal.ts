import {create} from 'zustand';

type UploadVideoStore = {
    isOpen?:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const useUploadVideoModal =create<UploadVideoStore>(set=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));

