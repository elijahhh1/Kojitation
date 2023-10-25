import React, { FC, MouseEventHandler, ReactNode } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

interface ConfirmModalProps{
    children?:ReactNode;
    onConfirm:()=>void;
}

const ConfirmModal:FC<ConfirmModalProps> = ({children,onConfirm}) => {
    const handleConfirm:MouseEventHandler<HTMLButtonElement> = e =>{
        e.stopPropagation();
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={e=>e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the Koji and remove the data from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={e=>e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModal