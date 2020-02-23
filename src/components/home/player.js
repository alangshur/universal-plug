import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'react-loader-spinner';

class HomePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerReady: 'false'
        }
    }

    _setPlayerReady = () => {
        console.log('rerady!')
        this.setState({
            playerReady: true
        });
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    zIndex: 2,

                    justifyContent: 'center',
                    alignItems: 'center',
                    
                    height: '100%',
                    width: '100%',

                    backgroundColor: 'rgba(0, 0, 0, 0.65)'
                }}
            >

                {/* back button */}
                <div
                    onClick={this.props.togglePlayer}
                    style={{
                        position: 'absolute',

                        right: '30px',
                        top: '20px',

                        fontSize: '16px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        color: 'lightgrey',

                        userSelect: 'none',
                        msUserSelect: 'none',
                        KhtmlUserSelect: 'none',
                        MozUserSelect: 'none'
                    }}
                >
                        [Back]
                </div>

                <ReactPlayer 
                    url={this.props.link}
                    onReady={this._setPlayerReady}
                    style={{
                        display: this.state.playerReady ? 'inline' : 'none',
                        zIndex: 2,
                    }}
                />

                <Loader 
                    type='Oval' 
                    color='lightgrey'
                    height='150px'
                    width='150px'
                    style={{
                        position: 'absolute',
                        zIndex: 1
                    }}
                />
            </div>
        )
    }   
} 

export default HomePlayer;