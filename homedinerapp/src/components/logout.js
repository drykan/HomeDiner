import React, { Component } from 'react';
import { BrowserRouter as Route, Redirect } from "react-router-dom";

import { app, facebookProvider } from './base';

class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        app.auth().signOut().then((user, err) => {
            this.setState({ redirect: true })
        })
    }

    render() {
        return <Redirect to='/' />
    }
}

export default Logout;
