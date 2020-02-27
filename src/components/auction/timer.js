import React, { Component } from 'react';

import { getPSTDate } from '../../utils';

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: '0'
        };
    }

    componentDidMount() {
        this._updateTime();
    }

    _updateTime = () => {
        const now = getPSTDate();
        const hoursLeft = 24 - now.getHours();
        const minutesLeft = 59 - now.getMinutes();
        const secondsLeft = 59 - now.getSeconds();

        // get greatest time unit
        var timeLeft = '';
        if (hoursLeft > 0) {
            timeLeft = hoursLeft + ' h, ' + minutesLeft + ' m';
            setTimeout(this._updateTime, 60000);
        }
        else if (minutesLeft > 0) {
            timeLeft = minutesLeft + ' m, ' + secondsLeft + ' s';;
            setTimeout(this._updateTime, 1000);
        }
        else if (secondsLeft > 0) {
            timeLeft = secondsLeft + ' s';
            setTimeout(this._updateTime, 1000);
        }

        this.setState({ timeLeft: timeLeft });
    }

    render() {
        return (
            <div>
                {this.state.timeLeft}
            </div>
        );
    }
}

export default CountdownTimer;