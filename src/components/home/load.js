import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoadingPage extends Component {
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

                        backgroundColor: '#f2f2f2',
                        cursor: 'default'
                    }}
                >
                    <Loader 
                        type='Oval' 
                        color='grey'
                        height={150}
                        width={150}
                    />
                </div>
            </>
        );
    }
}

export default LoadingPage;