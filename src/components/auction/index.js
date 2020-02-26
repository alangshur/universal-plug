import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { withFirebase } from '../firebase';
import { withAuthUser } from '../session';

class AuctionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    _goToHome = () => {
        this.props.history.push('/');
    }

    _onSignInSubmit = event => {
        this.props.firebase
        .doSignIn()
        .then(user => {
            this.setState({ error: null });
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    }

    _onSignOutSubmit = event => {
        this.props.firebase
        .doSignOut()
        .then(user => {
            console.log(user);
            this.setState({ error: null });
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    }

    _onPaymentSubmit = event => {
        event.preventDefault();
    }

    _onBuildProfile = event => {
        event.preventDefault();
    }

    render() {
        const userLoggedIn = Boolean(this.props.user);

        return (
            <>

                {/* user navbar */}
                <Navbar bg="light" expand="lg" style={{ zIndex: 1 }}>
                    <Navbar.Brand href="/auction">Auction</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>

                            {userLoggedIn &&
                                <>
                                    <Nav.Link onClick={this._onPaymentSubmit}>Add Payment</Nav.Link>
                                    <Nav.Link onClick={this._onBuildProfile}>Build Profile</Nav.Link>
                                </>
                            }

                            {userLoggedIn ?
                                <Nav.Link onClick={this._onSignOutSubmit}>Sign Out</Nav.Link> :
                                <Nav.Link onClick={this._onSignInSubmit}>Sign In</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>

                    {userLoggedIn &&
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text style={{ color: 'black' }}>
                                {this.props.user.displayName}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    }

                </Navbar>

                {/* page canvas */}
                <div
                    draggable={false}
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',

                        backgroundColor: '#f2f3f4',
                        cursor: 'default'
                    }}
                >
                </div>

                {/* {userLoggedIn && 

                } */}
            </>
        );
    }
}

export default withFirebase(withAuthUser(AuctionPage));