import React, { PropTypes } from 'react';
import moment               from 'moment';


const StatusTimestamp = ({ timestamp }) => (
    <span className="github__status__current__date">
        {moment(this.props.timestamp).fromNow()}
    </span>
);

StatusTimestamp.displayName = 'StatusTimestamp';

StatusTimestamp.propTypes = {
    timestamp: PropTypes.string.isRequired
};


export default StatusTimestamp;
