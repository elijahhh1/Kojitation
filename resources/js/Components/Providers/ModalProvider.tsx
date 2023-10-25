import React from 'react'
import SettingsModal from '../Modals/SettingsModal'
import CoverImageModal from '../Modals/CoverImageModal'

const ModalProvider = () => {
    return (
        <>
            <SettingsModal />
            <CoverImageModal />
        </>
    )
}

export default ModalProvider