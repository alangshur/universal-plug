import React, { Component } from 'react';

import { withFirebase } from '../firebase';
import { withAuthUser } from '../session';
import BackgroundImage from '../../assets/background.png';

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
                console.log(user);
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

                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',

                        cursor: 'default',
                        fontFamily: 'Helvetica'
                    }}
                >

                    {/* back button */}
                    <div
                        onClick={this._goToHome}
                        style={{
                            position: 'absolute',
                            zIndex: 1,

                            right: '30px',
                            top: '20px',

                            fontSize: '16px',
                            fontFamily: 'Helvetica',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            cursor: 'pointer',

                            userSelect: 'none',
                            msUserSelect: 'none',
                            KhtmlUserSelect: 'none',
                            MozUserSelect: 'none'
                        }}
                    >
                        [Back]
                    </div>

                    {/* sign in/out button */}
                    <div
                        onClick={this.props.user ? this._onSignOutSubmit : this._onSignInSubmit}
                        style={{
                            position: 'absolute',
                            zIndex: 1,

                            left: '30px',
                            top: '20px',

                            fontSize: '16px',
                            fontFamily: 'Helvetica',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            cursor: 'pointer',

                            userSelect: 'none',
                            msUserSelect: 'none',
                            KhtmlUserSelect: 'none',
                            MozUserSelect: 'none'
                        }}
                    >
                        {this.props.user ? '[Sign Out]' : '[Sign In]'}
                    </div>

                    {/* payment button */}
                    {this.props.user &&
                        <div>
                            <div
                                onClick={this._onBuildProfile}
                                style={{
                                    position: 'absolute',
                                    zIndex: 1,

                                    left: '30px',
                                    top: '60px',

                                    fontSize: '16px',
                                    fontFamily: 'Helvetica',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',

                                    userSelect: 'none',
                                    msUserSelect: 'none',
                                    KhtmlUserSelect: 'none',
                                    MozUserSelect: 'none'
                                }}
                            >
                                [Add Payment]
                            </div>
                        </div>
                    }

                    {/* payment button */}
                    {this.props.user &&
                        <div>
                            <div
                                onClick={this._onPaymentSubmit}
                                style={{
                                    position: 'absolute',
                                    zIndex: 1,

                                    left: '30px',
                                    top: '100px',

                                    fontSize: '16px',
                                    fontFamily: 'Helvetica',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',

                                    userSelect: 'none',
                                    msUserSelect: 'none',
                                    KhtmlUserSelect: 'none',
                                    MozUserSelect: 'none'
                                }}
                            >
                                [Build Profile]
                            </div>
                        </div>
                    }

                </div>
            </>
        );
    }
}

export default withFirebase(withAuthUser(AuctionPage));