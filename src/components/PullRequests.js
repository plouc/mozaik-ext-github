import React, { Component, PropTypes } from 'react'
import PullRequest                     from './PullRequest'


class PullRequests extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.pullRequests.${ repository }`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData: pullRequests } = this.props

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
                    {pullRequests.map(pullRequest => (
                        <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                    ))}
                </div>
            </div>
        )
    }
}

PullRequests.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.arrayOf(PropTypes.any),
}

PullRequests.defaultProps = {
    apiData: [],
}


export default PullRequests
