import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import MediaLink from './media';
import HomePlayer from './player';

import TestImage from '../../assets/test.png';
import PlayIcon from '../../assets/play.png';

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
        this.setState({ playerOpen: !this.state.playerOpen });
    }

    render() {
        return (
            <>

                {/* home video player */} 
                {this.state.playerOpen && 
                    <HomePlayer 
                        togglePlayer={this.togglePlayer} 
                        link='https://streamable.com/bwkxc'
                    />
                }

                {/* auction button */}
                {!this.state.playerOpen && 
                    <Button
                        onClick={this._goToAuction}
                        variant='outline-dark'
                        size='sm'
                        style={{
                            position: 'absolute',
                            zIndex: 1,

                            right: '20px',
                            top: '20px',
                        }}
                    >
                        Auction
                    </Button>
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

                        backgroundColor: '#f2f2f2',
                        cursor: 'default'
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
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                        }}
                    >

                        {/* profile image */}
                        <div
                            style={{
                                display: 'flex',
                                position: 'relative',
                                marginTop: '10%',
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

                                    height: '400px',
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
                                marginTop: '17%',

                                fontSize: '28px',
                                letterSpacing: '1px',
                                color: '#36454F',

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
                                marginTop: '6%',
                                flexDirection: 'column'
                            }}
                        >

                            <MediaLink media='instagram' text='alangshur' link='http://www.google.com' />
                            <MediaLink media='youtube' text='alexlangshur' link='http://www.google.com' />
                            <MediaLink media='website' text='alexlangshur.com' link='http://www.google.com' />

                        </div>

                        {/* profile text */}
                        <div
                            style={{
                                marginTop: '6%',
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