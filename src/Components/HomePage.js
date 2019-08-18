import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getEvents, getPlaces, getCategories } from "../API/eventAPI";
import NavBar from "./NavBar";
import DetailModal from "./DetailModal";
import EventItem from "./EventItem";
import Filter from "./Filter";
import LoginModal from "./LoginModal";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            location: "paris",
            isLoaded: true,
            currEvent: {},
            det: false,
            coords: {},
            places: [],
            categories: [],
            currCat: "music",
            logMod: false,
            signUp: false
        }
        this.cityname = "";
    }

    handleClose = () => {
        this.setState({currEvent: {}, det: false});
    }

    handleDetail = (e) => {
        const { events, det } = this.state;
        this.setState({currEvent: events.find((elt) => elt.id === e.target.id), det: !det});
    }

    handleSetCity = (e) => {
        const { href } = e.target;
        const { currCat, places } = this.state;
        let index = Number(href.substr(href.indexOf("#")+1));
        let coord = places[index].geometry.coordinates;
        this.setState({isLoaded: true, places: [], events: []}, () => {
            getEvents("where="+ coord[1] +","+ coord[0] +"&within=25&c="+currCat).then((res) => {
                this.setState({events: res.data.events.event, isLoaded: false, coords: {longitude: coord[0], latitude: coord[1]}, places: []});
            });
        });
        document.getElementById("city").value = e.target.textContent;
    }

    handleCity = (e) => {
        const { coords, currCat } = this.state;
        if ((e.target.value.length > 2 && coords.longitude) && this.cityname.length < e.target.value.length) {
             getPlaces("q="+ e.target.value +"&lat="+ coords.latitude +"&lon="+coords.longitude+"&c="+currCat).then((res) => {
                 this.setState({places: res.data.features});
                 console.log(res.data.features);
             });
        } else if (e.target.value.length === 0) {
            this.setState({places: []});
        }
        this.cityname = e.target.value;
        e.preventDefault();
    }

    showPosition = (position) => {
        const { currCat } = this.state;
        getEvents("where="+ position.coords.latitude +","+ position.coords.longitude +"&within=25&c="+currCat).then((res) => {
            this.setState({events: res.data.events.event, isLoaded: false, coords: position.coords});
        });
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Not supported");
        }
    }

    handleCat = (e) => {
        this.setState({isLoaded: true, events: [], currCat: e.target.value}, () => {
            const { coords, currCat } = this.state;
            getEvents("where="+ coords.latitude +","+ coords.longitude +"&within=25&c="+ currCat).then((res) => {
                this.setState({ events: res.data.events.event, isLoaded: false });
            });
        });
    }

    handleLog = (e) => {
        const { logMod } = this.state;
        let sign = false;
        if (e)
            sign = (e.target.textContent === "Login") ? false : true;
        this.setState({ logMod: !logMod, signUp: sign });
    }

    componentWillMount() {
        this.getGeoLocation();
        getCategories().then((res) => {
            this.setState({categories: res.data.category});
        });
    }

    render() {
        const { events, isLoaded, currEvent, det, places, categories, logMod, signUp } = this.state;
        return(
            <div>
                <NavBar handleLog={this.handleLog}/>
                <Container fluid>
                    <Row>
                        <Col lg="4">
                            <Filter places={places} handleCity={this.handleCity} handleSetCity={this.handleSetCity} cat={categories} handleCat={this.handleCat}/>
                        </Col>
                        <Col lg="8">
                            { isLoaded &&
                                <Row className="justify-content-center" style={{margin: "59px"}}>
                                    <Col xs="1">
                                        <Spinner animation="border" variant="danger" />
                                    </Col>
                                </Row>
                            }
                            {events.map((value, key) => (
                                <EventItem handleDetail={this.handleDetail} value={value} key={key}/>
                            ))}
                        </Col>
                    </Row>
                    {currEvent.id &&
                        <DetailModal show={det} handleClose={this.handleClose} currEvent={currEvent}/>
                    }
                    <LoginModal logShow={logMod} logModal={this.handleLog} signUp={signUp}/>
                </Container>
            </div>
        );
    }
}

export default HomePage;