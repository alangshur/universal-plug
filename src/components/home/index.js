import React, { Component } from 'react';

import TestImage from '../../assets/test.png';
import BackgroundImage from '../../assets/background.png';
import InstagramIcon from '../../assets/instagram.png';
import YoutubeIcon from '../../assets/youtube.png';
import WebsiteIcon from '../../assets/website.png';
import EmailIcon from '../../assets/email.png';
import LinkedInIcon from '../../assets/linkedin.png';

class HomePage extends Component {
    render() {
        return (
            <>

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

                            backgroundImage: 'linear-gradient(#ffcccb, white)',
                            borderRadius: '60px',
                            boxShadow: '0 0 10px lightgrey'
                        }}
                    >

                        {/* profile image */}
                        <img 
                            src={TestImage}
                            draggable={false}
                            style={{
                                marginTop: '13%',
                                height: '275px',
                                width: '275x',

                                borderRadius: '10px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            }}
                        />

                        {/* profile title */}
                        <div
                            style={{
                                marginTop: '8%',

                                fontSize: '28px',
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                                userSelect: 'none',
                                msUserSelect: 'none',
                                KhtmlUserSelect: 'none',
                                MozUserSelect: 'none'
                            }}
                        >
                            Grace Sherman
                        </div>

                        {/* profile links */}
                        <div
                            style={{
                                marginTop: '5%'
                            }}
                        >
                            <img  src={InstagramIcon} draggable={false} style={{ height: '25px', width: '25px', opacity: '0.55', paddingLeft: '7px', paddingRight: '7px', cursor: 'pointer' }} />
                            <img  src={YoutubeIcon} draggable={false} style={{ height: '25px', width: '25px', opacity: '0.55', paddingLeft: '7px', paddingRight: '7px', cursor: 'pointer' }} />
                            <img  src={WebsiteIcon} draggable={false} style={{ height: '25px', width: '25px', opacity: '0.55', paddingLeft: '7px', paddingRight: '7px', cursor: 'pointer' }} />
                            <img  src={EmailIcon} draggable={false} style={{ height: '25px', width: '25px', opacity: '0.55', paddingLeft: '7px', paddingRight: '7px', cursor: 'pointer' }} />
                            <img  src={LinkedInIcon} draggable={false} style={{ height: '25px', width: '25px', opacity: '0.55', paddingLeft: '7px', paddingRight: '7px', cursor: 'pointer' }} />
                        </div>

                        {/* profile text */}
                        <div
                            style={{
                                marginTop: '15%',
                                marginLeft: '50px',
                                marginRight: '50px',
                                marginBottom: '5%',

                                overflow: 'scroll',
                                textAlign: 'center',
                                fontSize: '13px',
                                color: '#36454F',
                                lineHeight: '20px',
                                userSelect: 'none',
                                msUserSelect: 'none',
                                KhtmlUserSelect: 'none',
                                MozUserSelect: 'none'
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet egestas felis. Mauris dignissim augue diam, nec ultrices purus lobortis eu. Integer quis scelerisque diam, et fringilla enim. Cras nibh ipsum, pulvinar non orci at, efficitur aliquet eros. Donec vitae lorem nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur eget euismod mauris. Vivamus tincidunt vulputate posuere. In euismod euismod lectus, nec sodales sem faucibus sit amet. Sed ut viverra libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae nisl accumsan, porta magna vitae, dapibus quam. Sed interdum ante enim, eget iaculis nibh ornare non. Quisque ornare vestibulum eros vel bibendum. Suspendisse libero dui, cursus eget mi blandit, mattis dictum turpis. Curabitur interdum tincidunt diam, ut luctus justo.
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default HomePage;