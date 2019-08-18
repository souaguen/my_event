import React, { Component } from "react";
import { Button, Row, Image, Modal } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';

class DetailModal extends Component {
    render() {
        const { show, currEvent, handleClose } = this.props;
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currEvent.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currEvent.image &&
                        <Row className="justify-content-center">
                            <Image src={currEvent.image.medium.url} width={200}/>
                        </Row>
                    }
                    <p>Start at: <i>{currEvent.start_time}</i></p>
                    <p><bold>{currEvent.city_name}, {currEvent.venue_address} {currEvent.postal_code && "("+ currEvent.postal_code +")"}</bold></p>
                    {ReactHtmlParser(currEvent.description)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DetailModal;