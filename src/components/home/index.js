import React, { Component } from 'react';

import TestImage from '../../assets/test.png';
import BackgroundImage from '../../assets/background.png';
import PlayIcon from '../../assets/play.png';

import MediaLink from './media';
import HomePlayer from './player';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOpen: false
        };
    }

    _goToAuction = () => {
        this.props.history.push('/auction');
    }

    togglePlayer = () => {
        console.log('this')
        this.setState({ playerOpen: !this.state.playerOpen });
    }

    render() {
        return (
            <>

                {/* home video player */} 
                {this.state.playerOpen && 
                    <HomePlayer 
                        togglePlayer={this.togglePlayer} 
                    />
                }

                {/* auction button */}
                {!this.state.playerOpen && 
                    <div
                        onClick={this._goToAuction}
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

                            serSelect: 'none',
                            msUserSelect: 'none',
                            KhtmlUserSelect: 'none',
                            MozUserSelect: 'none'
                        }}
                    >
                        [Auction]
                    </div>
                }

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

                    {/* page cutout */}
                    <div
                        style={{
                            display: 'flex',

                            alignItems: 'center',
                            flexDirection: 'column',

                            height: '90%',
                            width: '500px',

                            backgroundImage: 'linear-gradient(lightblue, white)',
                            borderRadius: '60px',
                            boxShadow: '0 0 10px lightgrey',

                        }}
                    >

                        {/* profile image */}
                        <div
                            style={{
                                display: 'flex',
                                position: 'relative',
                                marginTop: '14%',
                                top: 0,
                                left: 0,

                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <img
                                src={TestImage}
                                alt='Profile IMG'
                                draggable={false}
                                style={{
                                    position: 'relative',
                                    top: 0,
                                    left: 0,

                                    height: '350px',
                                    borderRadius: '25px',
                                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',

                                    userSelect: 'none',
                                    msUserSelect: 'none',
                                    KhtmlUserSelect: 'none',
                                    MozUserSelect: 'none'
                                }}
                            />

                            <img
                                src={PlayIcon}
                                alt='Play ICN'
                                draggable={false}
                                onClick={this.togglePlayer}
                                style={{
                                    position: 'absolute',
                                    height: '125px',
                                    cursor: 'pointer',

                                    userSelect: 'none',
                                    msUserSelect: 'none',
                                    KhtmlUserSelect: 'none',
                                    MozUserSelect: 'none'
                                }}
                            />
                        </div>

                        {/* profile title */}
                        <div
                            style={{
                                marginTop: '28%',

                                fontSize: '30px',
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                                userSelect: 'none',
                                msUserSelect: 'none',
                                KhtmlUserSelect: 'none',
                                MozUserSelect: 'none'
                            }}
                        >
                            Alex Langshur
                        </div>

                        {/* profile links */}
                        <div
                            style={{
                                display: 'flex',
                                marginTop: '5%',
                                flexDirection: 'column'
                            }}
                        >

                            <MediaLink media='instagram' text='alangshur' />
                            <MediaLink media='youtube' text='alexlangshur' />
                            <MediaLink media='website' text='alexlangshur.com' />

                        </div>

                        {/* profile text */}
                        <div
                            style={{
                                marginTop: '5%',
                                marginLeft: '52px',
                                marginRight: '52px',
                                marginBottom: '3%',
                                fontStyle: 'italic',

                                overflow: 'scroll',
                                textAlign: 'center',
                                fontSize: '15px',
                                color: '#36454F',
                                lineHeight: '20px',
                                userSelect: 'none',
                                msUserSelect: 'none',
                                KhtmlUserSelect: 'none',
                                MozUserSelect: 'none'
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet egestas felis. Mauris dignissim augue diam, nec ultrices purus lobortis eu. Integer quis scelerisque diam, et fringilla enim.
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default HomePage;