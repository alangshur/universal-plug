import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { withFirebase } from '../firebase';
import { withAuthUser } from '../session';
import {
    getFormattedDateString,
    getPSTMidnightEpoch
} from '../../utils';

import RefreshIcon from '../../assets/refresh.png';

class ProfileTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            winner: false,
            
            lastUpdate: 0,
            currentTimeout: null
        }
    }

    componentDidMount = () => {
        this._updateCurrentProfiles();
        this.setState({
            currentTimeout: setTimeout(
                this._updateCurrentProfiles, 
                getPSTMidnightEpoch()
            )
        });
    }

    componentWillUnmount() {
        if (this.state.currentTimeout) 
            clearTimeout(this.state.currentTimeout);
    }

    _buildProfile = () => {

    }

    _updateCurrentProfiles = () => {
        if (Date.now() - this.state.lastUpdate < 2000) return;
        this.setState({ fetching: true }, () => {
            this.props.firebase.verifyUserProfilePosition()
                .then(result => { 
                    this.setState({ 
                        fetching: false,
                        lastUpdate: Date.now(),
                        winner: result
                    }); 
                })
                .catch(err => { 
                    console.log('verifyUserProfilePosition: ' + err); 
                    this.setState({ 
                        fetching: false,
                        lastUpdate: Date.now(),
                        winner: false
                    }); 
                });
        });
    }

    render() {
        if (this.state.fetching) {
            return (
                <Loader
                    type='Oval'
                    color='grey'
                    height={150}
                    width={150}
                    style={{
                        marginTop: '5%'
                    }}
                />
            );
        }

        return (
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',

                    width: '45%',
                    padding: '1.5%',
                    marginTop: '3%',

                    color: '#36454F',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px'
                }}
            >
                {this.state.winner ? 
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ fontSize: '17px' }}>
                            You own the <b>{getFormattedDateString()}</b> profile:
                        </div>
                        
                        <Button
                            variant='outline-dark'
                            onClick={this._buildProfile}
                            style={{
                                width: '150px',
                                marginTop: '15px'
                            }}
                        >
                            Build Profile
                        </Button>
                    </div> :

                    <div>No Profile to Build</div>
                }

                <img
                    src={RefreshIcon}
                    alt='Refresh ICN'
                    onClick={this._updateCurrentProfiles}
                    style={{
                        position: 'absolute',
                        right: '25px',
                        height: '30px',

                        cursor: 'pointer',
                        opacity: '0.6'
                    }}
                />
            </div>
        );
    }
}

export default withFirebase(withAuthUser(ProfileTab));