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
import PullRequest                     from './PullRequest'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class PullRequests extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.arrayOf(PropTypes.any),
        apiError:   PropTypes.object,
    }

    static defaultProps = {
        apiData: [],
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.pullRequests.${ repository }`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData: pullRequests, apiError } = this.props

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> Pull Requests
            </span>
        ) : title

        return (
            <div>
                <WidgetHeader
                    title="pull requests"
                    subject={repository}
                    count={pullRequests.length}
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <div>
                            {pullRequests.map(pullRequest => (
                                <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                            ))}
                        </div>
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}
