import React from "react";
import { Modal, Button, Card } from "semantic-ui-react";



const TransModal = (props) => (
    <Modal trigger={<Card raised className="m-4 " color='blue'><Button basic color='blue'><p>{props.title}</p> <span className=".bg-info"><strong>{props.customer}</strong></span></Button></Card>} centered={true} size='tiny'>
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content style={{left: '30'}}>
        {props.children}
      </Modal.Content>
    </Modal>
  )
export default TransModal