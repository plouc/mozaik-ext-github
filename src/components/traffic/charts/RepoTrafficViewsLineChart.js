import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveChart as Chart, Scale, Axis, Grid, Line } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')

export default class RepoTrafficViewsLineChart extends Component {
    static propTypes = {
        views: PropTypes.array.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { views } = this.props
        const { theme } = this.context

        return (
            <Chart margin={margin} data={views} theme={theme.charts}>
                <Scale id="count" dataKey="count" type="linear" axis="y" />
                <Scale
                    id="timestamp"
                    dataKey="timestamp"
                    type="point"
                    axis="x"
                />
                <Grid xScale="timestamp" yScale="count" />
                <Axis scaleId="timestamp" format={format} position="bottom" />
                <Axis scaleId="count" position="left" />
                <Line
                    xScale="timestamp"
                    x="timestamp"
                    yScale="count"
                    y="count"
                    curve="linear"
                />
                <Line
                    xScale="timestamp"
                    x="timestamp"
                    yScale="count"
                    y="uniques"
                    curve="linear"
                />
            </Chart>
        )
    }
}
