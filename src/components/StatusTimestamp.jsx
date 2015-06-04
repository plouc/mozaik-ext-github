var React            = require('react');
var moment           = require('moment');

var StatusTimestamp = React.createClass({
    propTypes: {
        timestamp: React.PropTypes.string.isRequired
    },

    render() {
        var timestampFromNow = moment(this.props.timestamp).fromNow();

        return (
            <span className="github__status__current__date">{ timestampFromNow }</span>
        );

        return statusNode;
    }
});

module.exports = StatusTimestamp;