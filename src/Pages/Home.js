import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'holderjs';
import {Cards} from "../Components/Cards";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";

export class Home extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <Cards id="cards"/>
                <Footer />
            </>
        )
    }
}
