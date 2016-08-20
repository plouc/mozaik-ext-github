import React, { Component, PropTypes } from 'react'
import StatusIcon                      from './StatusIcon'
import StatusTimestamp                 from './StatusTimestamp'


class Status extends Component {
    static getApiRequest() {
        return { id: 'github.status' }
    }

    render() {
        const { apiData: status } = this.props

        let content = null
        if (status) {
            let messageNode = null

            if (status.status !== 'good') {
                messageNode = (
                    <span className="github__status__current__message">
                        {status.body}
                    </span>
                )
            }

            content = (
                <div className="github__status__current">
                    <StatusIcon status={status.status} message={status.body} />
                    {messageNode}
                    <StatusTimestamp timestamp={status.created_on} />
                </div>
            )
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        Github <span className="widget__header__subject">Status</span>
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {content}
                </div>
            </div>
        )
    }
}

Status.propTypes = {
    apiData: PropTypes.shape({
        status: PropTypes.string.isRequired,
        body:   PropTypes.string.isRequired,
    })
}


export default Status
