import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class StatusTimestamp extends Component {
    render() {
        const { timestamp } = this.props;

        return (
            <span className="github__status__current__date">
                {moment(timestamp).fromNow()}
            </span>
        );
    }
}

StatusTimestamp.displayName = 'StatusTimestamp';

StatusTimestamp.propTypes = {
    timestamp: PropTypes.string.isRequired
};


export default StatusTimestamp;
