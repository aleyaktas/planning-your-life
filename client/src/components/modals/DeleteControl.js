import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteControl = ({showcontrol,modalClose,onClickDelete, name}) => {
  return (
    <div>
      <Modal show={showcontrol} onHide={modalClose}>
        <Modal.Header>
          {name==="title" ? 
          <Modal.Title>Are you sure you want to delete this todo list?</Modal.Title>
          :
          <Modal.Title>Are you sure you want to delete this todo task?</Modal.Title>
          }
          
        </Modal.Header>
        <Modal.Footer>
          <Button className="modal-button modal-close-button" variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button className="modal-button modal-delete-button" variant="danger" onClick={onClickDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteControl
