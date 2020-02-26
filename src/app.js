import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/home';
import AuctionPage from './components/auction';
import { AuthUserContext } from './components/session';
import { withFirebase } from './components/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {

        // subscribe to changes
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            user => {
                user ?
                    this.setState({ user }) :
                    this.setState({ user: null });
            },
        );
    }

    componentWillUnmount() {

        // clean up listener
        this.listener && this.listener();
        this.listener = undefined;
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.user}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/auction' component={AuctionPage} exact />
                        <Route path='/' component={HomePage} />
                    </Switch>
                </BrowserRouter>
            </AuthUserContext.Provider>
        );
    }
}

export default withFirebase(App);
