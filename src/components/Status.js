/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import { WidgetHeader, WidgetBody }    from 'mozaik/ui'
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
                <WidgetHeader
                    title="GitHub"
                    subject="Status"
                    subjectPlacement="append"
                />
                <WidgetBody>
                    {content}
                </WidgetBody>
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
