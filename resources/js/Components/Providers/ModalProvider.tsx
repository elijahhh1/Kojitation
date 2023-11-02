import React from 'react'
import SettingsModal from '../Modals/SettingsModal'
import CoverImageModal from '../Modals/CoverImageModal'
import UploadVideoModal from '../Modals/UploadVideoModal'
import ChatModal from '../Modals/ChatModal'

const ModalProvider = () => {
    return (
        <>
            <SettingsModal />
            <CoverImageModal />
            <UploadVideoModal />
            <ChatModal/>
        </>
    )
}

export default ModalProvider
