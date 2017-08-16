import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveLine } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')
const axisLeft = {
    legend: 'visitors',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = { format }

export default class RepoTrafficViewsLineChart extends Component {
    static propTypes = {
        views: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { views, theme } = this.props

        return (
            <ResponsiveLine
                margin={margin}
                data={views}
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
