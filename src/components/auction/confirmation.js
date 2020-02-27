import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { currencyFormat } from '../../utils';

class ConfirmationModal extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    _handleConfirmationSubmit = () => {
        console.log('Submitting bid: $' + this.props.bid);
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
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Confirm Your Bid</Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            flexDirection: 'column'
                        }}
                    >
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

                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            className='mr-auto' 
                            variant='secondary'
                            onClick={this._handleBackSubmit}
                        >
                            Back
                        </Button>

                        {!this.state.error && 
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

export default ConfirmationModal;