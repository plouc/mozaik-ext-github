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
import RepositoryContributorStat       from './RepositoryContributorStat'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


class RepositoryContributorsStats extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.repositoryContributorsStats.${ repository }`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, apiError } = this.props
        let { apiData: contributors }         = this.props

        contributors = contributors.slice().sort((contribA, contribB) => (contribB.total - contribA.total))

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> contributors
            </span>
        ) : title

        return (
            <div>
                <WidgetHeader
                    title="contributors"
                    subject={repository}
                    count={contributors.length}
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <div>
                            {contributors.map(contributor => (
                                <RepositoryContributorStat
                                    key={contributor.author.id}
                                    contributor={contributor}
                                />
                            ))}
                        </div>
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}

RepositoryContributorsStats.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.arrayOf(
        PropTypes.any
    ),
    apiError:   PropTypes.object,
}

RepositoryContributorsStats.defaultProps = {
    apiData: [],
}


export default RepositoryContributorsStats
