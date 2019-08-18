import React, { Component } from "react";
import { Card, Form, ListGroup } from "react-bootstrap";

class Filter extends Component {
    render() {
        const { places, handleSetCity, handleCity, cat, handleCat } = this.props;
        return (
            <Card style={{marginTop: "50px"}}>
                <Card.Title>Filter</Card.Title>
                <Card.Body>
                    <Form.Label>Location :</Form.Label>
                    <Form.Control type="text" id="city" list="cities" name="city" onChange={handleCity} placeholder="ex: Paris, 75001, 8 rue du jardin..."/>
                    {places.length > 0 &&
                        <ListGroup>
                            {places.map((value, key) => (
                                <ListGroup.Item onClick={handleSetCity} action style={{cursor: "pointer"}} href={"#"+key}>{value.properties.label} ({value.properties.postcode})</ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                    <Form.Label>Categorie :</Form.Label>
                    <Form.Control as="select" onChange={handleCat}>
                        {cat.map((value, key) => (
                            <option key={key} value={value.id}>{value.id}</option>
                        ))}
                    </Form.Control>

                </Card.Body>
            </Card>
        );
    }
}

export default Filter;