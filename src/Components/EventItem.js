import React, {Component} from "react";
import ReactHtmlParser from 'react-html-parser';
import { Jumbotron, Button, Row, Col, Image } from "react-bootstrap";

class EventItem extends Component {
    render() {
        const { value, handleDetail } = this.props;
        return (
            <Jumbotron style={{marginTop: "50px"}}>
                <Row>
                    {value.image &&
                        <Col lg={3}>
                            <Image src={value.image.medium.url} width={200}/>
                        </Col>
                    }
                    <Col>
                        <h1>{value.title}</h1>
                        <p>Start at: <i>{value.start_time}</i></p>
                        <p><bold>{value.city_name}, {value.venue_address} {value.postal_code && "("+ value.postal_code +")"}</bold></p>
                        <div style={{height: "200px", overflow: "hidden"}}>
                            {value.description && 
                                <p>{ReactHtmlParser(value.description.substr(0, 300).trim() + "...")}</p>
                            }
                        </div>
                        <p>
                            <Button variant="primary" id={value.id} onClick={handleDetail}>Learn more</Button>
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default EventItem;