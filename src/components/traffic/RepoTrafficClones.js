import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepoTrafficClonesHistogramChart from './charts/RepoTrafficClonesHistogramChart'
import RepoTrafficClonesLineChart from './charts/RepoTrafficClonesLineChart'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'

export default class RepoTrafficClones extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.any,
        apiError: PropTypes.object,
        type: PropTypes.oneOf(['histogram', 'line']).isRequired,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        type: 'histogram',
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.trafficClones.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, type, apiData, apiError, theme } = this.props

        let countNode = null
        let body = <WidgetLoader />
        if (apiData !== undefined) {
            const { count, uniques, clones } = apiData

            countNode = (
                <span>
                    {count} clones - {uniques} unique clones
                </span>
            )

            if (type === 'histogram') {
                const chartData = clones.map(({ timestamp, uniques, count }) => ({
                    timestamp,
                    uniques,
                    others: count - uniques,
                }))

                body = <RepoTrafficClonesHistogramChart theme={theme} clones={chartData} />
            } else if (type === 'line') {
                const chartData = [
                    {
                        id: 'total',
                        data: clones.map(clone => ({
                            y: clone.count,
                            x: clone.timestamp,
                        })),
                    },
                    {
                        id: 'uniques',
                        data: clones.map(clone => ({
                            y: clone.uniques,
                            x: clone.timestamp,
                        })),
                    },
                ]

                body = <RepoTrafficClonesLineChart theme={theme} clones={chartData} />
            }
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Clones'}
                    subject={title ? null : repository}
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
