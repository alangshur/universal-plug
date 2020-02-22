import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class HomePlayer extends Component {
    constructor(props) {
        super(props);
    }

    // SOLUTION: USE STREAMBLE WITH REACT-PLAYER
    // render() {
    //     return (
    //         <ReactPlayer url='https://streamable.com/bwkxc' playing />
    //     );
    // }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    
                    height: '100%',
                    width: '100%',

                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            >

                {/* back button */}
                <div
                    onClick={this.props.togglePlayer}
                    style={{
                        position: 'absolute',
                        // zIndex: 3,

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

            </div>
        )
    }   
} 

export default HomePlayer;