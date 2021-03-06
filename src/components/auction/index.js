import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import AuctionConsole from './console';
import ProfileTab from './profile';
import { withFirebase } from '../firebase';
import { withAuthUser } from '../session';

class AuctionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: false
        };
    }

    _goToHome = () => {
        this.props.history.push('/');
    }

    _onSignInSubmit = event => {
        this.props.firebase
            .doSignIn()
            .catch(err => {
                console.log('signIn: ' + err);
            });

        event.preventDefault();
    }

    _onSignOutSubmit = event => {
        this.props.firebase
            .doSignOut()
            .catch(err => {
                console.log('signOut: ' + err);
            });

        event.preventDefault();
    }

    _onBuildProfile = event => {
        event.preventDefault();
        this.props.firebase.getCurrentAuction().then(data => console.log(data))
    }

    _verifyUserProfile = () => {
        
    }

    render() {
        const userLoggedIn = Boolean(this.props.user);

        return (
            <div
                style={{
                    userSelect: 'none',
                    msUserSelect: 'none',
                    KhtmlUserSelect: 'none',
                    MozUserSelect: 'none'
                }}
            >

                {/* user navbar */}
                <Navbar bg="light" expand="lg" style={{ zIndex: 1 }}>
                    <Navbar.Brand href="/auction">Auction</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" style={{ marginLeft: '7px' }}>Home</Nav.Link>

                            {userLoggedIn ?
                                <Nav.Link onClick={this._onSignOutSubmit} style={{ marginLeft: '7px' }}>
                                    Sign Out
                                </Nav.Link> :

                                <Nav.Link onClick={this._onSignInSubmit} style={{ marginLeft: '7px' }}>
                                    Sign In
                                </Nav.Link>
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

                        backgroundColor: '#eeeeee',
                        cursor: 'default'
                    }}
                >

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',

                            height: '100%',
                            width: '100%',
                        }}
                    >

                        {/* guidlines tab */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',

                                width: '45%',
                                padding: '1.5%',

                                color: '#36454F',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '10px'
                            }}
                        >
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Guidelines:
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '10px', paddingLeft: '20px' }}>
                                1.&ensp;
                                <i>
                                    Share your story with the world. Whether your goal is to build a
                                    massive following, promote an important message, or run for president,
                                    it all starts with your story.
                                </i>
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '10px', paddingLeft: '20px' }}>
                                2.&ensp;
                                <i>
                                    No advertisements please. People come to the site to learn
                                    about you, not a product.
                                </i>
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '10px', paddingLeft: '20px' }}>
                                3.&ensp;
                                <i>
                                    For one entire day [starting and ending at midnight PST],
                                    you are the center of attention.
                                </i>
                            </div>
                        </div>

                        {/* auction console */}
                        {userLoggedIn ?
                            <AuctionConsole /> :

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',

                                    width: '45%',
                                    padding: '1.5%',
                                    marginTop: '3%',

                                    color: '#36454F',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '10px'
                                }}
                            >
                                Sign In to Join Auction
                            </div>
                        }

                        {/* profile tab */}
                        {userLoggedIn ?
                            <ProfileTab /> :

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',

                                    width: '45%',
                                    padding: '1.5%',
                                    marginTop: '3%',

                                    color: '#36454F',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '10px'
                                }}
                            >
                                Sign In to Build Your Profiles
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withAuthUser(AuctionPage));