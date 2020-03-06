import React, { Component } from 'react';

import { withFirebase } from '../firebase';
import { 
    getFormattedDateString, 
    formatLargeNumber
} from '../../utils';

import HeartIcon from '../../assets/heart.png';
import CrossIcon from '../../assets/cross.png';

class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimeout: null,
            heartPressed: false,
            crossPressed: false,

            userHearts: 0,
            userCrosses: 0,
            userHeartsAdded: 0,
            userCrossesAdded: 0
        };
    }

    componentDidMount() {
        this.setState({
            currentTimeout: setTimeout(
                this._registerHeartsAndCrosses, 
                10000
            )
        });
    }

    componentWillUnmount() {
        if (this.state.currentTimeout) 
            clearTimeout(this.state.currentTimeout);
    }

    _handleHeartPress = () => {
        this.setState({
            heartPressed: true,
            userHearts: this.state.userHearts + 1
        }, () => {
            setTimeout(() => {
                this.setState({ heartPressed: false });
            }, 200);
        });
    }

    _handleCrossPress = () => {
        this.setState({
            crossPressed: true,
            userCrosses: this.state.userCrosses + 1
        }, () => {
            setTimeout(() => {
                this.setState({ crossPressed: false });
            }, 200);
        });
    }

    _registerHeartsAndCrosses = () => {
        const addHearts = this.state.userHearts - this.state.userHeartsAdded;
        const addCrosses = this.state.userCrosses - this.state.userCrossesAdded;

        // register additional hearts
        if (addHearts > 0) {
            this.props.firebase.registerHearts(addHearts)
                .then(data => {
                    if (data.success) this.setState({ userHeartsAdded: this.state.userHearts });
                    else throw new Error('Failed to register hearts');
                })
                .catch(err => {
                    console.log('registerHearts: ' + err);
                });
        }

        // register additional crosses
        if (addCrosses > 0) {
            this.props.firebase.registerCrosses(addCrosses)
                .then(data => {
                    if (data.success) this.setState({ userCrossesAdded: this.state.userCrosses });
                    else throw new Error('Failed to register crosses');
                })
                .catch(err => {
                    console.log('registerCrosses: ' + err);
                });
        }

        // set timeout for next register 
        this.setState({
            currentTimeout: setTimeout(
                this._registerHeartsAndCrosses, 
                30000
            )
        });
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    zIndex: 1,

                    flexDirection: 'column',
                    alignItems: 'center',

                    top: '25px',
                    left: '25px',
                    paddingTop: '13px',
                    paddingBottom: '16px',
                    paddingLeft: '22px',
                    paddingRight: '22px',

                    color: '#36454F',
                    cursor: 'default',
                    borderRadius: '7px',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                }}
            >

                {/* date title */}
                <div
                    style={{
                        fontWeight: 'bold',
                        letterSpacing: '1.5px',
                        fontSize: '30px'
                    }}
                >
                    {getFormattedDateString()}
                </div>

                {/* profile view count */}
                <div
                    style={{
                        marginTop: '6px',
                        fontSize: '16px',
                        fontStyle: 'italic',
                    }}
                >
                    {formatLargeNumber(this.props.views) + ' '} Views
                </div>

                {/* heart/cross buttons */}
                <div
                    style={{
                        marginTop: '35px',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >

                    {/* heart button/count */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '50%'
                        }}
                    >
                        <div
                            onClick={this._handleHeartPress}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                                height: '48px',
                                width: '48px',

                                borderStyle: 'solid',
                                borderWidth: '2px',
                                borderRadius: '50%',
                                borderColor: '#36454F',
                                backgroundColor: this.state.heartPressed ? '#28a745' : 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={HeartIcon}
                                alt='Heart ICN'
                                draggable={false}
                                style={{
                                    paddingTop: '2px',
                                    height: '28px',
                                    width: '28px',
                                    opacity: '0.9'
                                }}
                            />
                        </div>

                        <div 
                            style={{ 
                                marginTop: '7px',
                                // textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: '16px'
                            }}
                        >
                            {formatLargeNumber(this.props.hearts + this.state.userHearts)}
                        </div>
                    </div>

                    {/* cross button/count */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '50%'
                        }}
                    >
                        <div
                            onClick={this._handleCrossPress}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                                height: '48px',
                                width: '48px',

                                borderStyle: 'solid',
                                borderWidth: '2px',
                                borderRadius: '50%',
                                borderColor: '#36454F',
                                backgroundColor: this.state.crossPressed ? '#dc3545' : 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={CrossIcon}
                                alt='Cross ICN'
                                draggable={false}
                                style={{
                                    height: '24px',
                                    width: '24px',
                                    opacity: '0.9'
                                }}
                            />
                        </div>

                        <div
                            style={{ 
                                marginTop: '7px',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: '16px'
                            }}
                        >
                            {formatLargeNumber(this.props.crosses + this.state.userCrosses)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default withFirebase(HomeBanner);