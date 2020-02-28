import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { withFirebase } from '../firebase';
import { currencyFormat } from '../../utils';

class ConfirmationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            success: '',
            fetching: false
        }
    }

    _handleConfirmationSubmit = () => {
        this.setState({ fetching: true }, () => {
            this.props.firebase.bidCurrentAuction(this.props.bid)
                .then(data => {
                    if (data.success) {
                        this.setState({
                            fetching: false,
                            success: 'Successfully placed bid.'
                        });
                    }
                    else {
                        if (data.message) {
                            this.setState({
                                fetching: false,
                                error: data.message
                            });
                        }
                        else throw Error('Cannot resolve error');
                    }
                })
                .catch(err => {
                    console.log('bidCurrentAuction: ' + err);
                    this.setState({ 
                        fetching: false,
                        error: 'Unexpected error. Please refresh auction.'
                    });
                });
        });
    }

    _handleBackSubmit = () => {
        this.setState({ error: '' }, () => {
            this.props.back();
        });
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,

                    height: '100%',
                    width: '100%',

                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(3px)'
                }}
            >
                <Modal.Dialog style={{ width: '25%' }}>
                    <Modal.Header>
                        <Modal.Title>Confirm Your Bid</Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            flexDirection: 'column',
                        }}
                    >

                        {this.state.fetching ?
                            <Loader
                                type='Oval'
                                color='grey'
                                height={50}
                                width={50}
                            /> :

                            <>
                                <div>
                                    Are you sure you want to submit a bid of&nbsp;
                                    <b>{currencyFormat(this.props.bid)}</b>?
                                </div>

                                {this.state.error &&
                                    <div
                                        style={{
                                            marginTop: '6px',
                                            color: '#dc3545',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {this.state.error}
                                    </div>
                                }

                                {this.state.success &&
                                    <div
                                        style={{
                                            marginTop: '6px',
                                            color: '#28a745',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {this.state.success}
                                    </div>
                                }
                            </>
                        }

                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            className='mr-auto'
                            variant='secondary'
                            onClick={this._handleBackSubmit}
                        >
                            Back
                        </Button>

                        {!this.state.fetching && !this.state.error && !this.state.success &&
                            <Button
                                variant='dark'
                                onClick={this._handleConfirmationSubmit}
                            >
                                Submit
                            </Button>
                        }
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default withFirebase(ConfirmationModal);