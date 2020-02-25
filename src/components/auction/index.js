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
        return (
            <>

                {/* user navbar */}
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/auction">Auction</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>

                            {this.props.user &&
                                <>
                                    <Nav.Link onClick={this._onPaymentSubmit}>Add Payment</Nav.Link>
                                    <Nav.Link onClick={this._onBuildProfile}>Build Profile</Nav.Link>
                                </>
                            }

                            {this.props.user ?
                                <Nav.Link onClick={this._onSignOutSubmit}>Sign Out</Nav.Link> :
                                <Nav.Link onClick={this._onSignInSubmit}>Sign In</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>

                    {this.props.user &&
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text style={{ color: 'black' }}>
                                {this.props.user.displayName}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    }

                </Navbar>


            
            </>
        );
    }
}

export default withFirebase(withAuthUser(AuctionPage));