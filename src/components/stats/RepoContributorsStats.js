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
import RepoContributorStat             from './RepoContributorStat'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class RepoContributorsStats extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.shape({
            contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError:   PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.repositoryContributorsStats.${ repository }`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let count
        if (apiData && !apiError) {
            const contributors = apiData.contributors.slice().sort((contribA, contribB) => (contribB.total - contribA.total))

            count = contributors.length
            body  = (
                <div>
                    {contributors.map(contributor => (
                        <RepoContributorStat
                            key={contributor.author.id}
                            contributor={contributor}
                        />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Contributors'}
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
