import React, { Component } from 'react';

import { 
    getFormattedDateString, 
    formatViewsCount,
    formatLargeNumber
} from '../../utils';

import HeartIcon from '../../assets/heart.png';
import CrossIcon from '../../assets/cross.png';

class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heartPressed: false,
            crossPressed: false,

            hearts: 0,
            crosses: 0,
            userHearts: 0,
            userCrosses: 0,
            userHeartsAdded: 0,
            userCrossesAdded: 0
        };
    }

    _handleHeartPress = () => {
        this.setState({
            heartPressed: true,
            userHearts: this.state.userHearts + 1
        }, () => {
            setTimeout(() => {
                this.setState({ heartPressed: false });
            }, 150);
        });
    }

    _handleCrossPress = () => {
        this.setState({
            crossPressed: true,
            userCrosses: this.state.userCrosses + 1
        }, () => {
            setTimeout(() => {
                this.setState({ crossPressed: false });
            }, 150);
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
                    {formatViewsCount(this.props.views) + ' '} Views
                </div>

                {/* heart/cross buttons */}
                <div
                    style={{
                        marginTop: '35px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%'
                    }}
                >

                    {/* heart button/count */}
                    <div
                        onClick={this._handleHeartPress}
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div
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
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: '16px'
                            }}
                        >
                            {formatLargeNumber(this.state.hearts + this.state.userHearts)}
                        </div>
                    </div>

                    {/* cross button/count */}
                    <div
                        onClick={this._handleCrossPress}
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div
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
                            {formatLargeNumber(this.state.crosses + this.state.userCrosses)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default HomeBanner;