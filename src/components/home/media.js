import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import InstagramIcon from '../../assets/instagram.png';
import YoutubeIcon from '../../assets/youtube.png';
import WebsiteIcon from '../../assets/website.png';
import EmailIcon from '../../assets/email.png';
import LinkedInIcon from '../../assets/linkedin.png';

class MediaLink extends Component {
    render() {
        var icon = undefined;

        // choose correct media icon
        switch (this.props.media) {
            case 'instagram': icon = InstagramIcon; break;
            case 'youtube': icon = YoutubeIcon; break;
            case 'website': icon = WebsiteIcon; break;
            case 'email': icon = EmailIcon; break;
            case 'linkedin': icon = LinkedInIcon; break;
        }

        return (
            <Row
                style={{
                    cursor: 'pointer'
                }}
            >

                <img
                    src={icon}
                    alt='Media ICN'
                    draggable={false}
                    style={{
                        height: '20px',
                        width: '20px',
                        opacity: '0.6',
                        marginBottom: '10px'
                    }}
                />

                <div
                    style={{
                        marginLeft: '15px',
                        paddingBottom: '2px',

                        fontSize: '13px',
                        fontStyle: 'oblique'
                    }}
                >
                    {this.props.text}
                </div>
            </Row>
        );
    }
}

export default MediaLink;