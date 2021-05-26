import React from 'react';
import {Accordion, Button, Card, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'holderjs';
import {Cards} from "../Components/Cards";

function Header() {
    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {date: new Date()};
        }

        componentDidMount() {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        tick() {
            this.setState({
                date: new Date()
            });
        }

        render() {
            return (
                <div>
                    <h4 className="text-light">Часики-то тикают {this.state.date.toLocaleTimeString()}</h4>
                </div>
            );
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#Cards">Карточки</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Clock/>,
        </Navbar>
    )
}

function Buttons() {
    return (
        <>
            <Button variant="primary">Primary</Button>{' '}
            <Button variant="secondary">Secondary</Button>{' '}
            <Button variant="success">Success</Button>{' '}
            <Button variant="warning">Warning</Button>{' '}
            <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
            <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
            <Button variant="link">Link</Button>
        </>
    )
}

export class Home extends React.Component {

    render() {
        return (
            <>
                <Header/>
                <Accordion>
                    <Card>
                        <Card.Header className="text-center">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <h1 className="text-center">Карточки хуле</h1>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="p-0">
                                <Cards id="Cards"/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header className="text-center">
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <h1 className="text-center">Кнопочки</h1>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body><Buttons/></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}
