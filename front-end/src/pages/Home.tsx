import React from 'react';
import logo from '../img/logo.svg';
import {HelloWorldComponent} from "../components/home/HelloWorldComponent";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/pages/Home.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React (boilerplate)
                    </a>
                    <p><b>Using GET request below here:</b></p>
                    <HelloWorldComponent />
                </header>
            </div>
        </div>
    )
}

