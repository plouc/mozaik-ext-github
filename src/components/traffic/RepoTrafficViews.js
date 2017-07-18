import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepoTrafficViewsHistogramChart from './charts/RepoTrafficViewsHistogramChart'
import RepoTrafficViewsLineChart from './charts/RepoTrafficViewsLineChart'
import { TrapApiError, Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

export default class RepoTrafficViews extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.any,
        apiError: PropTypes.object,
        type: PropTypes.oneOf(['histogram', 'line']).isRequired,
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.trafficViews.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, type, apiData, apiError } = this.props

        let countNode = null
        let body = null
        if (apiData !== undefined) {
            const { count, uniques, views } = apiData

            countNode = (
                <span>
                    {count} views - {uniques} unique visitors
                </span>
            )

            if (type === 'histogram') {
                body = <RepoTrafficViewsHistogramChart views={views} />
            } else if (type === 'line') {
                body = <RepoTrafficViewsLineChart views={views} />
            }
        }

        return (
            <Widget>
                <WidgetHeader
                    title="Visitors"
                    subject={repository}
                    count={countNode}
                    icon="line-chart"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
