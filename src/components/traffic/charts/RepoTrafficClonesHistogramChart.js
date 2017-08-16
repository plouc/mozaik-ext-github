import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')
const axisLeft = {
    legend: 'clones',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = { format }

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
