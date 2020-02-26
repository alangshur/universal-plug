import React, { Component } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { getFormattedDateStringFromDate,
    currencyFormat } from '../../utils';
import { withFirebase } from '../firebase';
import { withAuthUser } from '../session';

class AuctionConsole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userBidValue: '',
            validUserBid: false,
            invalidUserBid: false,
            fetching: true,
            auctionBid: null,
            auctionDate: null,
            auctionTarget: null
        };
    }

    componentDidMount() {

        // get current auction data
        this.props.firebase.getCurrentAuction()
            .then(auction => {
                this.setState({
                    auctionBid: currencyFormat(auction.bid),
                    auctionDate: auction.date,
                    auctionTarget: auction.target
                });
            })
            .catch(err => {
                console.log('getCurrentAuction: ' + err);
            })
            .then(() => { this.setState({ fetching: false }); });
    }

    _handleBidSubmit = () => {

    }

    _handleBidChange = event => {
        const bid = event.target.value;
        const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
        if (bid.length === 0 || regex.test(bid)) {
            this.setState({ userBidValue: bid });
        }
    }

    render() {
        if (this.state.fetching) {
            return (
                <Loader
                    type='Oval'
                    color='grey'
                    height={150}
                    width={150}
                />
            );
        }

        return (
            <>

                {this.state.auctionTarget ?
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
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',

                                width: '45%',
                                padding: '1.5%',

                                backgroundColor: 'white',
                                borderRadius: '5px'
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

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',

                                width: '45%',
                                padding: '1.5%',
                                marginTop: '3%',

                                backgroundColor: 'white',
                                borderRadius: '5px'
                            }}
                        >
                            <div style={{ fontSize: '20px', }}>
                                Auction for &nbsp;
                                <b>{getFormattedDateStringFromDate(this.state.auctionTarget)}</b>
                                &nbsp; Profile:
                            </div>

                            <Button
                                variant='outline-dark'
                                disabled
                                style={{
                                    width: '50%',
                                    marginTop: '40px',

                                    cursor: 'default',
                                    color: 'black',
                                    borderColor: 'black'
                                }}
                            >
                                Current Bid: {this.state.auctionBid}
                            </Button>

                            <InputGroup
                                style={{
                                    marginTop: '20px',
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
                                    <Button variant='dark' onSubmit={this._handleBidSubmit}>
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
                                    Invalid bid. Must be a valid monetary amount.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                    </div> :

                    <Button
                        variant='outline-secondary'
                        disabled
                        style={{
                            cursor: 'default',
                            padding: '15px'
                        }}
                    >
                        No Running Auction
                    </Button>
                }
            </>
        );
    }
}
export default withFirebase(withAuthUser(AuctionConsole));