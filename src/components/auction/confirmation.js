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
                            textAlign: 'center'
                        }}
                    >
                        <div>
                            Are you sure you want to submit a bid of&nbsp;
                            <b>{currencyFormat(this.props.bid)}</b>?
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            className='mr-auto' 
                            variant='secondary'
                            onClick={this.props.back}
                        >
                            Back
                        </Button>

                        <Button 
                            variant='dark'
                            onClick={this._handleConfirmationSubmit}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default ConfirmationModal;