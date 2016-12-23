/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes } from 'react'
import PullRequest                     from './PullRequest'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class PullRequests extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.shape({
            pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError:   PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.pullRequests.${ repository }`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let count
        if (apiData) {
            count = apiData.pullRequests.length
            body  = (
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
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
