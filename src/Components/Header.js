import React from "react";
import {Nav, Navbar} from "react-bootstrap";

export function Header() {
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
            <Navbar.Brand href="#home">Полигон</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#cards">Карточки</Nav.Link>
            </Nav>
            <Clock/>,
        </Navbar>
    )
}
