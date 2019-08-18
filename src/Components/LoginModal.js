import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { loginSign } from "../API/eventAPI";
const serialize = require("form-serialize");

class LoginModal extends Component {
    handleSubmit = () => {
        let form = serialize(document.getElementById("myForm"), {hash: true});
        loginSign(form);
    }

    render() {
        const { logShow, logModal, signUp } = this.props;
        return (
            <Modal show={logShow} onHide={logModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="myForm">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email"/>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter password"/>
                            {(signUp) ?
                                <>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control name="confirm" type="password" placeholder="Enter password"/>
                                    <Form.Label>Pseudo</Form.Label>
                                    <Form.Control name="pseudo" type="text" placeholder="Enter pseudo"/>
                                    <Form.Control type="hidden" name="id" value="signUp"/>
                                </> : <Form.Control type="hidden" name="id" value="login"/>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSubmit}>{(signUp) ? "Sign Up" : "Login"}</Button>
                    <Button variant="danger" onClick={logModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LoginModal;