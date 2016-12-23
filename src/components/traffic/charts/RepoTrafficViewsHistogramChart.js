/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')


export default class RepoTrafficViewsHistogramChart extends Component {
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
                <Scale id="count" type="linear" axis="y" dataKey="count"/>
                <Scale id="timestamp" type="band" axis="x" dataKey="timestamp" padding={0.3}/>
                <Grid yScale="count" />
                <Axis scaleId="timestamp" format={format} position="bottom" axis="x"/>
                <Axis scaleId="count" position="left" axis="y"/>
                <Bars xScale="timestamp" x="timestamp" yScale="count" y="count" color="#fff"/>
                <Bars xScale="timestamp" x="timestamp" yScale="count" y="uniques" color="#ccc"/>
            </Chart>
        )
    }
}
