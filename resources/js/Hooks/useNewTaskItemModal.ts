import {create} from 'zustand';

type TaskItemStore = {
    isOpen?:boolean;
    onOpen:(id:number)=>void;
    onClose:()=>void;
    task_id?:number;
}

export const useNewTaskItemModal = create<TaskItemStore>((set)=>({
    task_id:undefined,
    isOpen:false,
    onOpen:(task_id)=>set({isOpen:true,task_id}),
    onClose:()=>set({isOpen:false}),
}))