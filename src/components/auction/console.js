import React, { Component } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import CountdownTimer from './timer';
import ConfirmationModal from './confirmation';
import { withFirebase } from '../firebase';
import {
    getFormattedDateStringFromDate,
    currencyFormat,
    getPSTMidnightEpoch
} from '../../utils';

import RefreshIcon from '../../assets/refresh.png';

class AuctionConsole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            fetching: true,
            confirmationOpen: false,

            lastUpdate: 0,
            currentTimeout: null,

            userBidValue: '',
            submittedUserBid: null,
            validUserBid: false,
            invalidUserBid: false,

            auctionBid: null,
            auctionDate: null,
            auctionTarget: null,
            auctionUserBid: null
        };
    }

    componentDidMount() {
        this._updateCurrentAuction();
        this.setState({
            currentTimeout: setTimeout(
                this._updateCurrentAuction, 
                getPSTMidnightEpoch()
            )
        });
    }

    componentWillUnmount() {
        if (this.state.currentTimeout) 
            clearTimeout(this.state.currentTimeout);
    }

    _updateCurrentAuction = () => {
        if (Date.now() - this.state.lastUpdate < 2000) return;

        // get current auction data
        this.setState({ fetching: true }, () => {
            this.props.firebase.getCurrentAuction()
                .then(auction => {
                    this.setState({
                        fetching: false,
                        lastUpdate: Date.now(),
                        auctionBid: Number(auction.bid),
                        auctionDate: auction.date,
                        auctionTarget: auction.target
                    });
                })
                .catch(err => {
                    console.log('getCurrentAuction: ' + err);
                    this.setState({
                        fetching: false,
                        lastUpdate: Date.now(),
                        auctionBid: null,
                        auctionDate: null,
                        auctionTarget: null
                    });
                });
        });
    }

    _updateCurrentUserBid = (bid) => {
        this.setState({ 
            auctionUserBid: bid,
            userBidValue: '',
            submittedUserBid: null,
            validUserBid: false,
            invalidUserBid: false,
        });
    }

    _closeConfirmationModal = () => {
        this.setState({
            confirmationOpen: false
        }, () => {
            this._updateCurrentAuction();
        });
    }

    _handleBidSubmit = () => {
        const bid = this.state.userBidValue;
        const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

        // make sure bid is valid
        if (bid.length === 0 || !regex.test(bid)) {
            this.setState({
                invalidUserBid: true,
                error: 'Invalid bid. Must be a valid monetary amount.'
            });
            return;
        }

        // make sure bid is convertable
        var bidVal = undefined;
        try { bidVal = Number(bid); }
        catch (err) {
            this.setState({
                invalidUserBid: true,
                error: 'Invalid bid. Must be a valid monetary amount.'
            });
            return;
        }

        // make sure bid makes sense
        if (bid <= this.state.auctionBid) {
            this.setState({
                invalidUserBid: true,
                error: 'Bid must be greater than current top bid.'
            });
            return;
        }

        // launch confirmation modal
        this.setState({
            error: '',
            invalidUserBid: false,
            confirmationOpen: true,
            submittedUserBid: bidVal
        });
    }

    _handleBidChange = event => {
        const bid = event.target.value;
        const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
        if (bid.length === 0) {
            this.setState({
                validUserBid: false,
                invalidUserBid: false,
                userBidValue: bid
            });
        }
        else if (regex.test(bid)) {
            this.setState({
                validUserBid: true,
                invalidUserBid: false,
                userBidValue: bid
            });
        }
    }

    _handleBidRefresh = () => {
        this._updateCurrentAuction();
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

        if (this.state.auctionBid === this.state.auctionUserBid)
            var userHasTopBid = true;

        return (
            <>

                {/* confirmation modal */}
                {this.state.confirmationOpen &&
                    <ConfirmationModal
                        bid={this.state.submittedUserBid}
                        back={this._closeConfirmationModal}
                        updateUserBid={this._updateCurrentUserBid}
                    />
                }

                {/* auction console */}
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

                    {this.state.auctionTarget ?

                        /* active auction */
                        <>
                            <div style={{ fontSize: '22px', }}>
                                Auction for&nbsp;
                                <b>{getFormattedDateStringFromDate(this.state.auctionTarget)}</b>
                                &nbsp;Profile
                            </div>

                            <div
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                    width: '50%',
                                    marginTop: '45px',
                                    padding: '7px',

                                    cursor: 'default',
                                    borderColor: '#ced4da',
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderRadius: '5px',
                                    fontSize: '15px'
                                }}
                            >
                                <b>Time Left:&nbsp;&nbsp;</b><CountdownTimer />
                            </div>

                            <div
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                    width: '50%',
                                    marginTop: '20px',
                                    padding: '7px',

                                    cursor: 'default',
                                    borderColor: userHasTopBid ? '#28a745' : '#ced4da',
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderRadius: '5px',
                                    fontSize: '15px'
                                }}
                            >
                                <div>
                                    <b>
                                        Top Bid{userHasTopBid ? ' (Yours)' : ''}:&nbsp;&nbsp;
                                    </b>
                                    {currencyFormat(this.state.auctionBid)}
                                </div>

                                <img
                                    src={RefreshIcon}
                                    alt='Refresh ICN'
                                    onClick={this._handleBidRefresh}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        height: '25px',

                                        cursor: 'pointer',
                                        opacity: '0.6'
                                    }}
                                />
                            </div>

                            <InputGroup
                                style={{
                                    marginTop: '20px',
                                    marginBottom: '10px',
                                    width: '50%'
                                }}
                            >
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>

                                <FormControl
                                    placeholder='Your Bid'
                                    onChange={this._handleBidChange}
                                    maxLength={10}
                                    value={this.state.userBidValue}
                                    isValid={this.state.validUserBid}
                                    isInvalid={this.state.invalidUserBid}
                                />

                                <InputGroup.Append>
                                    <Button
                                        variant='dark'
                                        onClick={this._handleBidSubmit}
                                    >
                                        Place Bid
                                    </Button>
                                </InputGroup.Append>

                                <Form.Control.Feedback
                                    type='invalid'
                                    style={{
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {this.state.error}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </> :

                        /* inactive auction */
                        <div style={{ color: '#36454F' }}>
                            Next Auction Will Start Soon
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default withFirebase(AuctionConsole);