import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { isBrowser } from 'react-device-detect';
import Loader from 'react-loader-spinner';

import { withFirebase } from '../firebase';
import MediaLink from './media';
import HomePlayer from './player';
import HomeBanner from './banner';

import PlayIcon from '../../assets/play.png';
import DividerIcon from '../../assets/divider.png';
import TransparentImage from '../../assets/transparent.png';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOpen: false,
            displayProfile: false,
            date: '',
            set: false,
        };
    }

    componentDidMount() {

        // get current profile
        this.props.firebase.getCurrentProfile()
            .then((profile) => {
                if (profile) {
                    if (profile.imageLink === '') var image = TransparentImage;
                    else image = profile.imageLink;
                    if (profile.videoLink === '') var video = null;
                    else video = profile.videoLink;

                    this.setState({
                        playerOpen: false,
                        displayProfile: true,

                        /* profile metadata */
                        date: profile.date,
                        set: profile.set,
                        views: profile.views,
                        hearts: profile.hearts,
                        crosses: profile.crosses,

                        /* profile data */
                        profileTitle: profile.title,
                        profileImageLink: image,
                        profileVideoLink: video,
                        profileText: profile.text,
                        profileLink1: profile.link1,
                        profileLink2: profile.link2,
                        profileLink3: profile.link3
                    });
                }
            })
            .catch(err => {
                console.log('getProfile: ' + err);
            });

        // record profile view
        this.props.firebase.registerView()
            .then(data => {
                if (!data.success) throw new Error('Failed to register view');
            })
            .catch(err => {
                console.log('registerView: ' + err);
            });
    }

    _goToAuction = () => {
        this.props.history.push('/auction');
        // this.props.firebase.setCurrentProfile({
        //     title: 'Alex Langshur',
        //     imageLink: 'https://i.imgur.com/IHAoMzT.png',
        //     videoLink: 'https://streamable.com/bwkxc',
        //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //     link1: { link: 'http://www.instagram.com', media: 'instagram', text: 'alangshur' },
        //     link2: { link: 'http://www.youtube.com', media: 'youtube', text: 'alexlangshur' },
        //     link3: { link: 'http://www.google.com', media: 'website', text: 'alexlangshur.com' }
        // });
    }

    _togglePlayer = () => {
        this.setState({ playerOpen: !this.state.playerOpen });
    }

    _handleImageError = () => {
        this.setState({ profileImageLink: TransparentImage });
    }

    _getProfileColor = () => {
        if (this.state.hearts === undefined || this.state.crosses === undefined)
            return 'rgb(220, 220, 220)';
        const hearts = this.state.hearts === 0 ? 1 : this.state.hearts;
        const crosses = this.state.crosses === 0 ? 1 : this.state.crosses;

        // get polarity direction
        const degree = 100;
        const ratioPolarity = hearts >= crosses;
        const likeRatio = ratioPolarity ?
            Math.min((hearts / crosses) / degree, 1.0) :
            Math.min((crosses / hearts) / degree, 1.0);

        // interpolate color
        if (likeRatio < 0.1) return 'rgb(220, 220, 220)';  
        if (ratioPolarity) var color = '(' + 40 + ', ' + 167  + ', ' + 69 + ', ' + likeRatio + ')';
        else color = '(' + 220 + ', ' + 53  + ', ' + 69 + ', ' + likeRatio + ')';
        return 'rgba' + color;
    }

    render() {

        // set loading feature
        if (!this.state.displayProfile) {
            var centralFeature = (
                <Loader
                    type='Oval'
                    color='grey'
                    height={150}
                    width={150}
                />
            );
        }

        // set empty profile
        else if (!this.state.set) {
            centralFeature = (
                <Button
                    variant='outline-dark'
                    disabled
                    style={{
                        cursor: 'default',
                        fontSize: '15px',
                        color: 'black',
                        padding: '15px'
                    }}
                >
                    Today's Profile Will Be Posted Soon
                </Button>
            );
        }
 
        // set profile feature 
        else {
            centralFeature = (
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'column',

                        height: '90%',
                        width: '500px',
                        paddingTop: '50px',
                        paddingBottom: '50px',

                        overflow: isBrowser ? 'hidden' : 'scroll',
                        backgroundImage: 'linear-gradient(white, ' + this._getProfileColor() + ')',
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
                            src={this.state.profileImageLink}
                            alt='Profile IMG'
                            draggable={false}
                            onError={this._handleImageError}
                            style={{
                                height: 'auto',
                                width: 'auto',
                                maxHeight: '350px',
                                maxWidth: '85%',

                                borderRadius: '10px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.25)'
                            }}
                        />

                        {/* profile play icon */}
                        {this.state.profileVideoLink && 
                            <img
                                src={PlayIcon}
                                alt='Play ICN'
                                draggable={false}
                                onClick={this._togglePlayer}
                                style={{
                                    position: 'absolute',
                                    height: '125px',
                                    cursor: 'pointer'
                                }}
                            />
                        }
                    </div>

                    {/* profile middle (divider icon) */}
                    <img
                        src={DividerIcon}
                        alt='Divider ICN'
                        draggable={false}
                        style={{
                            width: '100px',
                            paddingTop: '20px',

                            opacity: '0.7'
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
                                marginBottom: '30px',

                                fontSize: '30px',
                                letterSpacing: '1px',
                                color: '#36454F'
                            }}
                        >
                            {this.state.profileTitle}
                        </div>

                        {/* profile links */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '30px'
                            }}
                        >
                            <MediaLink media={this.state.profileLink1.media} text={this.state.profileLink1.text} link={this.state.profileLink1.link} />
                            <MediaLink media={this.state.profileLink2.media} text={this.state.profileLink2.text} link={this.state.profileLink2.link} />
                            <MediaLink media={this.state.profileLink3.media} text={this.state.profileLink3.text} link={this.state.profileLink3.link} />
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
                                lineHeight: '20px'
                            }}
                        >
                            {this.state.profileText}
                        </div>
                    </div>
                </div>
            );
        }

        // return profile page
        return (
            <div
                style={{
                    userSelect: 'none',
                    msUserSelect: 'none',
                    KhtmlUserSelect: 'none',
                    MozUserSelect: 'none'
                }}
            >

                {/* home video player */}
                {this.state.playerOpen &&
                    <HomePlayer
                        togglePlayer={this._togglePlayer}
                        link={this.state.profileVideoLink}
                    />
                }

                {/* auction button */}
                {!this.state.playerOpen && isBrowser &&
                    <Button
                        onClick={this._goToAuction}
                        variant='light'
                        style={{
                            position: 'absolute',
                            zIndex: 1,

                            top: '25px',
                            right: '25px',

                            color: '#36454F',
                            borderWidth: '0px',
                            backgroundColor: '#f8f9fa',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        Auction
                    </Button>
                }

                {/* date/views banner */}
                {isBrowser && 
                    <HomeBanner
                        views={this.state.views}
                        hearts={this.state.hearts}
                        crosses={this.state.crosses}
                    />
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

                        backgroundColor: '#eeeeee',
                        cursor: 'default'
                    }}
                >
                    {centralFeature}
                </div>
            </div>
        );
    }
}

export default withFirebase(HomePage);