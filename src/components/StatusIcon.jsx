var React = require('react');

var StatusIcon = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired
    },

    render() {
        var iconClasses = 'fa fa-';
        var statusClasses = 'github__status__current__icon github__status__current__icon--';

        if (this.props.status.toLowerCase() === 'good') {
            iconClasses += 'check-square';
            statusClasses += 'ok';
        } else {
            iconClasses += 'warning';
            statusClasses += 'not-ok';
        }

        return (
            <span className={ statusClasses } title={ this.props.message }>
                <i className={ iconClasses } />
            </span>
        );

        return statusNode;
    }
});

module.exports = StatusIcon;