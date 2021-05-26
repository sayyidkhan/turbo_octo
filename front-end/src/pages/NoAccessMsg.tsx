import '../App.css';
import {Component} from "react";

export default class NoAccessMsg extends Component {
    render() {
        return (
            <div className="message-container">
                <p>You have no access to this page.</p>
            </div>
        );
    }
}
