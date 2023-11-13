import React from 'react'
import SettingsModal from '../Modals/SettingsModal'
import CoverImageModal from '../Modals/CoverImageModal'
import UploadVideoModal from '../Modals/UploadVideoModal'
import ChatModal from '../Modals/ChatModal'
import FaqModal from '../Modals/FaqModal'
import SendFeedbackModal from '../Modals/SendFeedbackModal'

const ModalProvider = () => {
    return (
        <>
            <SettingsModal />
            <CoverImageModal />
            <UploadVideoModal />
            <ChatModal/>
            <FaqModal/>
            <SendFeedbackModal/>
        </>
    )
}

export default ModalProvider
