import React, {useEffect} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import {run as runHolder} from "holderjs";


export function Footer() {
    useEffect(() => {runHolder('carimg');});
    return (
            <footer className="bg-dark">
                <Container className="text-light">
                    <Row>
                        <Col md={3}>
                            <h4 className="text-center">Связь со мной</h4>
                            <div className="mb-2 mt-2">
                                    <Image
                                        src="holder.js/40x40" roundedCircle
                                    />
                                    <p className="d-inline align-content-center"> Вконтакте</p>
                            </div>
                            <div className="mb-2">
                                <Image
                                    src="holder.js/40x40" roundedCircle
                                />
                                <p className="d-inline align-content-center"> GitHub</p>
                            </div>
                            <div className="mb-2">
                                <Image
                                    src="holder.js/40x40" roundedCircle
                                />
                                <p className="d-inline align-content-center"> Discord</p>
                            </div>
                        </Col>
                        <Col>
                            <p>HEllo</p>
                        </Col>
                    </Row>
                    <h5 className="m-0 pb-2 text-center">By WaneTol72 2021</h5>
                </Container>
            </footer>
    )
}
