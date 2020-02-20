import React, { Component } from 'react';

import TestImage from '../../assets/test.png';
import BackgroundImage from '../../assets/background.png';

class HomePage extends Component {
    render() {
        return (

            <div
                draggable={false}
                style={{
                    position: 'absolute',
                    display: 'flex',

                    top: 0,
                    left: 0,

                    height: '100%',
                    width: '100%',

                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                }}
            >

                {/* profile container */}
                <div
                    id='profile'
                    style={{
                        position: 'relative',
                        display: 'flex',

                        height: '40%',
                        width: '40%',

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    {/* profile image */}
                    <img
                        id='profile-image'
                        src={TestImage}
                        alt='Test Image'
                        draggable={false}
                        onLoad={this.onImgLoad}

                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            objectFit: 'cover'
                        }}
                    />

                    {/* profile text */}
                    <div
                        id='profile-text'
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            zIndex: 1,

                            width: '30%',

                            right: '105%',
                            top: '65%',

                            padding: '15px',

                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderRadius: '4px',

                            backgroundColor: '#f6f6f6',
                            fontSize: '0.9vw'
                        }}
                    >
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                        Test profile text
                    </div>

                    {/* profile links */}
                    <div
                        id='profile-links'
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            zIndex: 1,

                            width: '30%',

                            left: '105%',
                            top: '5%',

                            padding: '15px',

                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderRadius: '4px',

                            backgroundColor: '#f6f6f6',
                            fontSize: '0.9vw'
                        }}
                    >
                        Test profile links
                        Test profile links
                        Test profile links
                        Test profile links
                        Test profile links
                        Test profile links
                        Test profile links
                        Test profile links
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;