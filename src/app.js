import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/home';
import AuctionPage from './components/auction';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/auction' component={AuctionPage} exact />
                    <Route path='/' component={HomePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
