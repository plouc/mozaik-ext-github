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
import moment                          from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetStatusBadge,
} from 'mozaik/ui'


export default class Status extends Component {
    static propTypes = {
        apiData: PropTypes.shape({
            status: PropTypes.string.isRequired,
            body:   PropTypes.string.isRequired,
        })
    }

    static getApiRequest() {
        return { id: 'github.status' }
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { apiData: _status, apiError } = this.props
        const { theme } = this.context

        let status = 'unknown'
        let messageNode
        let meta
        if (_status) {
            status      = _status.status
            messageNode = _status.body
            meta        = (
                <span style={{ color: theme.colors.textMute }}>
                    <i className="fa fa-clock-o"/>&nbsp;
                    {moment(_status.created_on).fromNow()}
                </span>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title="GitHub"
                    subject="Status"
                    subjectPlacement="append"
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <WidgetStatusBadge
                            status={status}
                            message={messageNode}
                            meta={meta}
                        />
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
