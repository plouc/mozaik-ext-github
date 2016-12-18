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
import _                               from 'lodash'
import {
    Gauge,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class PullRequestsGauge extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        thresholds: PropTypes.arrayOf(PropTypes.shape({
            threshold: PropTypes.number.isRequired,
            color:     PropTypes.string.isRequired,
            message:   PropTypes.string.isRequired,
        })).isRequired,
        apiData: PropTypes.arrayOf(PropTypes.any),
    }

    static defaultProps = {
        apiData:    [],
        thresholds: [
            { threshold: 3,  color: '#85e985', message: 'good job!' },
            { threshold: 5,  color: '#ecc265', message: 'you should consider reviewing' },
            { threshold: 10, color: '#f26a3f', message: 'pull requests overflow' },
        ]
    }

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
                <WidgetHeader
                    title="pull requests"
                    subject={repository}
                    count={pullRequests.length}
                    icon="github-alt"
                />
                <WidgetBody>
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
                </WidgetBody>
            </div>
        )
    }
}
