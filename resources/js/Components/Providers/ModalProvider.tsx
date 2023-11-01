import React from 'react'
import SettingsModal from '../Modals/SettingsModal'
import CoverImageModal from '../Modals/CoverImageModal'
import UploadVideoModal from '../Modals/UploadVideoModal'

const ModalProvider = () => {
    return (
        <>
            <SettingsModal />
            <CoverImageModal />
            <UploadVideoModal />
        </>
    )
}

export default ModalProvider