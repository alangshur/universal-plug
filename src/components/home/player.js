import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'react-loader-spinner';
import { Button } from 'react-bootstrap';

class HomePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerReady: 'false'
        }
    }

    _setPlayerReady = () => {
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
                <Button
                    onClick={this.props.togglePlayer}
                    variant='outline-light'
                    size='sm'
                    style={{
                        position: 'absolute',
                        zIndex: 1,

                        right: '20px',
                        top: '20px',
                    }}
                >
                    Back
                </Button>

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
                    height={150}
                    width={150}
                    style={{
                        position: 'absolute',
                        zIndex: '1'
                    }}
                />
            </div>
        )
    }   
} 

export default HomePlayer;