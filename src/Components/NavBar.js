import React, { Component } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
class NavBar extends Component {
    render() {
        const { handleLog } = this.props;
        return (
            <Navbar bg="dark" variant="dark" className="justify-content-between">
                <Navbar.Brand href="#home">My Event</Navbar.Brand>
                <Dropdown alignRight>
                    <Dropdown.Toggle variant="primary">
                        <FaUser/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => handleLog(e)}>Login</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => handleLog(e)}>Sign Up</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        );
    }
}
export default NavBar;