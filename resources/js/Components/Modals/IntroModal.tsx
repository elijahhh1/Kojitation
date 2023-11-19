import React, { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'


const IntroModal:FC<boolean> = (isOpen) => {
    return (
        <Dialog open={isOpen} onOpenChange={()=>false}>
            <DialogContent className='bg-gradient-to-b from-[#DDEDEA] via-[#DAEAFF] to-[#E8DFF5] dark:text-gray-900'>
                <DialogHeader className='dark:text-gray-900'>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='text-lg font-medium'>Introduction</span>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default IntroModal
