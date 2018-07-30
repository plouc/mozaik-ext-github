import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    GithubIcon,
} from '@mozaik/ui'
import PullRequest from './PullRequest'

export default class PullRequests extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.pullRequests.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let count = 0
        if (apiData) {
            count = apiData.pullRequests.length
            body = (
                <div>
                    {apiData.pullRequests.map(pullRequest => (
                        <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Pull Requests'}
                    subject={title ? null : repository}
                    count={count}
                    icon={GithubIcon}
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
