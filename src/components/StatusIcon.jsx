import React, { PropTypes } from 'react';

export default React.createClass({
    displayName: 'StatusIcon',

    propTypes: {
        status:  PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    },

    render() {
        var iconClasses   = 'fa fa-';
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
    }
});
