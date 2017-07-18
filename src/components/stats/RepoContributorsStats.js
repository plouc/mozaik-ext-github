import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GithubIcon from 'react-icons/lib/fa/github-alt'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from '@mozaik/ui'
import RepoContributorStat from './RepoContributorStat'

export default class RepoContributorsStats extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.repositoryContributorsStats.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let count
        if (apiData && !apiError) {
            const contributors = apiData.contributors
                .slice()
                .sort((contribA, contribB) => contribB.total - contribA.total)

            count = contributors.length
            body = (
                <div>
                    {contributors.map(contributor =>
                        <RepoContributorStat
                            key={contributor.author.id}
                            contributor={contributor}
                        />
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Contributors'}
                    subject={title ? null : repository}
                    count={count}
                    icon={GithubIcon}
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
