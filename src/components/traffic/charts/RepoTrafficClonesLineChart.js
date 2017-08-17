import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveLine } from 'nivo'

const margin = { top: 10, right: 20, bottom: 54, left: 60 }
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

export default class RepoTrafficClonesLineChart extends Component {
    static propTypes = {
        clones: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { clones, theme } = this.props

        return (
            <ResponsiveLine
                margin={margin}
                data={clones}
                theme={theme.charts}
                stacked={false}
                animate={false}
                axisLeft={axisLeft}
                axisBottom={axisBottom}
                colors={theme.charts.colors}
            />
        )
    }
}
