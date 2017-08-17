import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveBar } from 'nivo'

const margin = { top: 10, right: 10, bottom: 54, left: 60 }
const format = d => moment(d).format('MM/DD')
const axisLeft = {
    legend: 'clones',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = {
    format,
    tickRotation: -60,
}

export default class RepoTrafficClonesHistogramChart extends Component {
    static propTypes = {
        clones: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { clones, theme } = this.props

        return (
            <ResponsiveBar
                margin={margin}
                data={clones}
                indexBy="timestamp"
                keys={['uniques', 'others']}
                theme={theme.charts}
                animate={false}
                xPadding={0.3}
                axisLeft={axisLeft}
                axisBottom={axisBottom}
                labelsTextColor="inherit:darker(1.2)"
                labelsLinkColor="inherit"
                colors={theme.charts.colors}
            />
        )
    }
}
