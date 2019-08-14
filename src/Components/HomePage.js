import React, { Component } from "react";
import { Navbar, Dropdown, Container, Jumbotron, Button, Row, Col, Image } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { getEvents } from "../API/eventAPI";
import ReactHtmlParser from 'react-html-parser';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            location: "paris",
            categorie: ""
        }
    }

    componentWillMount() {
        getEvents("paris").then((res) => {
            this.setState({events: res.data.events.event});
            console.log(res.data.events.event);
        });
    }

    render() {
        const { events } = this.state;
        return(
            <div>
                <Navbar bg="dark" variant="dark" className="justify-content-between" fixed>
                    <Navbar.Brand href="#home">My Event</Navbar.Brand>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="primary">
                            <FaUser/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Login</Dropdown.Item>
                            <Dropdown.Item>Sign Up</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar>
                <Container>
                    {events.map((value, key) => (
                        <Jumbotron key={key} style={{marginTop: "50px"}}>
                            <Row>
                                {value.image &&
                                    <Col xs={3}>
                                        <Image src={value.image.medium.url} width={200}/>
                                    </Col>
                                }
                                <Col>
                                    <h1>{value.title}</h1>
                                    <p>Start at: <i>{value.start_time}</i></p>
                                    {ReactHtmlParser(value.description)}
                                    <p>
                                        <Button variant="primary">Learn more</Button>
                                    </p>
                                </Col>
                            </Row>
                        </Jumbotron>
                    ))}
                </Container>
            </div>
        );
    }
}

export default HomePage;