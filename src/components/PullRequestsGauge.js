import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Mozaik                          from 'mozaik/ui'
const { Gauge }                        = Mozaik


class PullRequestsGauge extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.pullRequests.${ repository }`,
            params: { repository },
        }
    }

    render() {
        const { repository, thresholds, title, apiData: pullRequests } = this.props

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> pull requests
            </span>
        ) : title

        let cappedValue    = Math.min(pullRequests.length, _.max(thresholds.map(threshold => threshold.threshold)))
        let message        = null
        let normThresholds = thresholds.map(threshold => {
            if (message === null && cappedValue <= threshold.threshold) {
                message = threshold.message
            }

            return {
                upperBound: threshold.threshold,
                color:      threshold.color,
            }
        })

        return (
            <div>
                <div className="widget__header">
                    <span>
                        {titleNode}
                        <span className="widget__header__count">
                            {pullRequests.length}
                        </span>
                    </span>
                    <i className="fa fa-github-alt"/>
                </div>
                <div className="widget__body">
                    <div className="github__pull-requests_gauge_chart">
                        <Gauge
                            donutRatio={0.65}
                            spacing={{ top: 45, right: 45, left: 45 }}
                            ranges={normThresholds}
                            value={pullRequests.length}
                        />
                    </div>
                    <div className="github__pull-requests_gauge_message">
                        {message}
                    </div>
                </div>
            </div>
        )
    }
}

PullRequestsGauge.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    thresholds: PropTypes.arrayOf(PropTypes.shape({
        threshold: PropTypes.number.isRequired,
        color:     PropTypes.string.isRequired,
        message:   PropTypes.string.isRequired,
    })).isRequired,
    apiData: PropTypes.arrayOf(PropTypes.any),
}

PullRequestsGauge.defaultProps = {
    apiData:    [],
    thresholds: [
        { threshold: 3,  color: '#85e985', message: 'good job!' },
        { threshold: 5,  color: '#ecc265', message: 'you should consider reviewing' },
        { threshold: 10, color: '#f26a3f', message: 'pull requests overflow' },
    ]
}


export default PullRequestsGauge
