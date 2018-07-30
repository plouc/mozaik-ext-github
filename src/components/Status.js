import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetStatusBadge,
    ClockIcon,
    GithubIcon,
} from '@mozaik/ui'

export default class Status extends Component {
    static propTypes = {
        apiData: PropTypes.shape({
            status: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest() {
        return { id: 'github.status' }
    }

    render() {
        const { apiData: _status, apiError } = this.props

        let status = 'unknown'
        let messageNode
        let meta
        if (_status) {
            status = _status.status
            messageNode = _status.body
            meta = (
                <span /*style={{ color: theme.colors.textMute }}*/>
                    <ClockIcon size="1.8vmin" style={{ display: 'inline-block' }} />
                    &nbsp;
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
                    icon={GithubIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <WidgetStatusBadge status={status} message={messageNode} meta={meta} />
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
