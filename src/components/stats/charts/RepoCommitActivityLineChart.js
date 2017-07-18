import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveChart as Chart, Scale, Axis, Grid, Line } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }

export default class RepoCommitActivityLineChart extends Component {
    static propTypes = {
        commits: PropTypes.array.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { commits } = this.props
        const { theme } = this.context

        return (
            <Chart margin={margin} data={commits} theme={theme.charts}>
                <Scale id="commits" dataKey="total" type="linear" axis="y" />
                <Scale id="week" dataKey="week" type="point" axis="x" />
                <Grid yScale="commits" />
                <Axis
                    scaleId="commits"
                    position="left"
                    legend="commits"
                    legendPosition="center"
                    legendOffset={-40}
                />
                <Axis scaleId="week" axis="x" position="bottom" />
                <Line
                    xScale="week"
                    x="week"
                    yScale="commits"
                    y="total"
                    curve="linear"
                />
            </Chart>
        )
    }
}
