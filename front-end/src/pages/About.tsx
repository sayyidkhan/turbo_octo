import React from 'react';
import {UserListComponent} from "../components/about/UserListComponent";
import {PostUserComponent} from "../components/about/PostUserComponent";


export default function About() {
    return (
        <div>
            <h1>About</h1>
            <div>
                <header className="App-header">
                    <p>
                        Edit <code>src/pages/About.tsx</code> and save to reload.
                    </p>
                    <p><b>Create New User:</b></p>
                    <PostUserComponent/>
                    <p><b>User List:</b></p>
                    <UserListComponent/>
                </header>
            </div>
        </div>
    )
}