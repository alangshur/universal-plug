import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import MediaLink from './media';
import HomePlayer from './player';

import PlayIcon from '../../assets/play.png';
import DividerIcon from '../../assets/divider.png';

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

    _togglePlayer = () => {
        this.setState({ playerOpen: !this.state.playerOpen });
    }

    render() {
        return (
            <>

                {/* home video player */}
                {this.state.playerOpen &&
                    <HomePlayer
                        togglePlayer={this._togglePlayer}
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
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'column',

                            height: '90%',
                            width: '500px',
                            paddingTop: '60px',
                            paddingBottom: '60px',

                            overflow: 'scroll',
                            backgroundImage: 'linear-gradient(lightblue, white)',
                            borderRadius: '60px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                        }}
                    >

                        {/* profile top */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            {/* profile image */}
                            <img
                                src='https://i.imgur.com/IHAoMzT.png'
                                alt='Profile IMG'
                                draggable={false}
                                style={{
                                    height: 'auto',
                                    width: 'auto',
                                    maxHeight: '400px',
                                    maxWidth: '400px',

                                    borderRadius: '15px',
                                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',

                                    userSelect: 'none',
                                    msUserSelect: 'none',
                                    KhtmlUserSelect: 'none',
                                    MozUserSelect: 'none'
                                }}
                            />

                            {/* profile play icon */}
                            <img
                                src={PlayIcon}
                                alt='Play ICN'
                                draggable={false}
                                onClick={this._togglePlayer}
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
 
                        {/* divider icon (middle) */}
                        <img
                            src={DividerIcon}
                            alt='Divider ICN'
                            draggable={false}
                            style={{
                                width: '90px',

                                opacity: '0.7',
                                userSelect: 'none',
                                msUserSelect: 'none',
                                KhtmlUserSelect: 'none',
                                MozUserSelect: 'none'
                            }}
                        />

                        {/* profile bottom */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >

                            {/* profile title */}
                            <div
                                style={{
                                    marginBottom: '20px',

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
                                    flexDirection: 'column',
                                    marginBottom: '20px'
                                }}
                            >
                                <MediaLink media='instagram' text='alangshur' link='http://www.google.com' />
                                <MediaLink media='youtube' text='alexlangshur' link='http://www.google.com' />
                                <MediaLink media='website' text='alexlangshur.com' link='http://www.google.com' />
                            </div>

                            {/* profile text */}
                            <div
                                style={{
                                    paddingLeft: '50px',
                                    paddingRight: '50px',
                                    bottom: 0,

                                    fontStyle: 'italic',
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
                </div>
            </>
        );
    }
}

export default HomePage;