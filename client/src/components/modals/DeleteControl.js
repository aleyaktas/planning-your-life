import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteControl = ({showcontrol,modalClose,onClickDelete, name}) => {
  return (
    <div>
      <Modal className="modal" show={showcontrol} onHide={modalClose}>
        <Modal.Header>
          {name==="title" ? 
          <Modal.Title>Are you sure you want to delete this todo list?</Modal.Title>
          :
          <Modal.Title>Are you sure you want to delete this todo task?</Modal.Title>
          }
          
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteControl
