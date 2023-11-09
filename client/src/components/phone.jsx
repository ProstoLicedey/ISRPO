import React from 'react';
import PhonePng from "../asets/phone.png";
import {Col, Container, Row} from "react-bootstrap";
import Ecran from "./ecran";

const Phone = () => {
    return (
        <Container >
            <Row className="justify-content-center align-items-center" >
                <Col xs={6}>
        <div
            className="justify-content-center p-4 m-4"
            style={{background: `url(${PhonePng}) no-repeat center center`,
                width:406,
                overflowY: 'auto',

                scrollbarWidth:0,
                backgroundSize:'contain',
                height: 720}}
        >
            <div className="pt-2 pb-3" style={{height:600}} >
                <Ecran />
            </div>
        </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Phone;