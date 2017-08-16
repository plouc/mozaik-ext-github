import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveLine } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment.unix(d).format('MM/DD')
const axisLeft = {
    legend: 'commits',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = {
    format,
}

export default class RepoCommitActivityLineChart extends Component {
    static propTypes = {
        commits: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { commits, theme } = this.props

        return (
            <ResponsiveLine
                margin={margin}
                data={commits}
                theme={theme.charts}
                animate={false}
                enableGridX={false}
                axisLeft={axisLeft}
                axisBottom={axisBottom}
                colors={theme.charts.colors}
            />
        )
    }
}
