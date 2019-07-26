import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Atoms
import { Button } from '../../Atoms'

const { body } = document

const ModalWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 120;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(33, 35, 52, 0.7);
  z-index: -1;
`

const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 48px;
  border-radius: 0.25rem;
`

const ModalMessage = styled.p`
  margin-bottom: 19px;
`
const Modal = ({ title, open, onClose }) => {
  // Root Component
  const [PortalComponent] = useState(document.createElement('div'))
  const handleCloseModal = () => {
    body.removeChild(PortalComponent)
    onClose()
  }
  if (open) {
    body.appendChild(PortalComponent)

    return createPortal(
      <ModalWrapper>
        <ModalOverlay onClick={handleCloseModal} />
        <ModalContent>
          <ModalMessage>{title}</ModalMessage>
          <Button type="button" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </ModalContent>
      </ModalWrapper>,
      PortalComponent,
    )
  }
  return null
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
}

export default Modal
