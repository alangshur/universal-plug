import React, { Component } from 'react';

// temporary test image
import TestImage from '../assets/test.png'; 

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

                    backgroundColor: 'white'
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
                        alignItems: 'center',
                    }}
                >

                    {/* profile image */}
                    <img 
                        id='profile-image'
                        src={TestImage} 
                        alt='Test Image' 
                        draggable={false}
                        style={{
                            width: '100%'
                        }}
                    />

                    {/* profile title */}
                    <div
                        id='profile-title'
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            zIndex: 1,

                            height: '12%',
                            width: '50%',

                            left: '93%',
                            top: '6%',

                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            backgroundColor: 'white',
                        }}
                    >
                        Test profile title
                    </div>

                    {/* profile text */}
                    <div
                        id='profile-text'
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            zIndex: 1,

                            height: '40%',
                            width: '60%',

                            left: '45%',
                            top: '93%',

                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            backgroundColor: 'white',
                        }}
                    >
                        Test profile text
                    </div>

                    {/* profile links */}
                    <div
                        id='profile-links'
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            zIndex: 1,

                            height: '40%',
                            width: '30%',

                            right: '93%',
                            top: '55%',

                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            backgroundColor: 'white',
                        }}
                    >
                        Test profile links
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;