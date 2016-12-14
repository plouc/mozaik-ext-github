import React, { Component, PropTypes } from 'react'
import { TrapApiError }                from 'mozaik/ui'
import RepositoryContributorStat       from './RepositoryContributorStat'


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
                <div className="widget__header">
                    <span>
                        {titleNode}
                        <span className="widget__header__count">
                            {contributors.length}
                        </span>
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
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
                </div>
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
