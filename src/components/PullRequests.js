import React, { Component, PropTypes } from 'react'
import { TrapApiError }                from 'mozaik/ui'
import PullRequest                     from './PullRequest'


class PullRequests extends Component {
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
                <div className="widget__header">
                    <span>
                        {titleNode}
                        <span className="widget__header__count">
                            {pullRequests.length}
                        </span>
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    <TrapApiError error={apiError}>
                        <div>
                            {pullRequests.map(pullRequest => (
                                <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                            ))}
                        </div>
                    </TrapApiError>
                </div>
            </div>
        )
    }
}

PullRequests.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.arrayOf(PropTypes.any),
    apiError:   PropTypes.object,
}

PullRequests.defaultProps = {
    apiData: [],
}


export default PullRequests
