import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "App.css";
import Title from "components/Title/Title"; // notics the path

class App extends Component {
    render () {
        return (
            <div className="App">
                <Title />
                <h1 className="message"> 
                    Hello World!
                </h1>
            </div>
        );
    }
}

export default hot(module)(App);