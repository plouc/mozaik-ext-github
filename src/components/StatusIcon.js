import React, { Component, PropTypes } from 'react'


class StatusIcon extends Component {
    render() {
        const { status, message } = this.props

        let iconClasses   = 'fa fa-'
        let statusClasses = 'github__status__current__icon github__status__current__icon--'

        if (status.toLowerCase() === 'good') {
            iconClasses += 'check-square'
            statusClasses += 'ok'
        } else {
            iconClasses += 'warning'
            statusClasses += 'not-ok'
        }

        return (
            <span className={statusClasses} title={message}>
                <i className={iconClasses} />
            </span>
        )
    }
}

StatusIcon.propTypes = {
    status:  PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}


export default StatusIcon
