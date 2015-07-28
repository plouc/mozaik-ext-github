import React, { PropTypes } from 'react';
import moment               from 'moment';


export default React.createClass({
    displayName: 'StatusTimestamp',

    propTypes: {
        timestamp: PropTypes.string.isRequired
    },

    render() {
        var timestampFromNow = moment(this.props.timestamp).fromNow();

        return (
            <span className="github__status__current__date">{ timestampFromNow }</span>
        );
    }
});
