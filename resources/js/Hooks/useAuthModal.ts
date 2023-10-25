
import {create} from 'zustand';


interface AuthModal{
    isOpen?:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}



export const useAuthModal = create<AuthModal>(set=>({
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));