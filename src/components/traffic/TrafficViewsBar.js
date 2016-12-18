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
import moment                          from 'moment'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'
import {
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')


export default class TrafficViewsBar extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.any,
        apiError:   PropTypes.object,
    }

    static defaultProps = {}

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.trafficViews.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, apiData, apiError } = this.props
        const { theme }                         = this.context

        let countNode = null
        let body      = null
        if (apiData !== undefined) {
            const { count, uniques, views } = apiData

            countNode = (
                <span>
                    {count} views - {uniques} unique visitors
                </span>
            )

            body = (
                <Chart margin={margin} data={views} theme={theme.charts}>
                    <Scale id="count" type="linear" axis="y" dataKey="count"/>
                    <Scale id="timestamp" type="band" axis="x" dataKey="timestamp" padding={0.3}/>
                    <Grid yScale="count" />
                    <Axis scaleId="timestamp" format={format} position="bottom" axis="x"/>
                    <Axis scaleId="count" position="left" axis="y"/>
                    <Bars xScale="timestamp" x="timestamp" yScale="count" y="count" color="#F00"/>
                    <Bars xScale="timestamp" x="timestamp" yScale="count" y="uniques" color="#F0F"/>
                </Chart>
            )
        }

        return (
            <div>
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
            </div>
        )
    }
}
