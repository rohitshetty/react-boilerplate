import React, {Component} from "react";
import "./Title.css"; // using relative imports only in same folders or short distant files
import reactLogo from "images/react-logo.png"; // notice the import path

class Title extends Component {
    render () {
        return (
            <div className="title">
                    <img src={reactLogo} className='react-logo'></img> boilerplate yo!
            </div>
        );
    }
}

export default Title;