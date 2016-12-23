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
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')


export default class RepoCommitActivityHistogramChart extends Component {
    static propTypes = {
        commits: PropTypes.array.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { commits } = this.props
        const { theme }   = this.context

        return (
            <Chart margin={margin} data={commits} theme={theme.charts}>
                <Scale id="commits" dataKey="total" type="linear" axis="y"/>
                <Scale id="week" dataKey="week" type="band" axis="x" padding={0.2}/>
                <Grid yScale="commits" />
                <Axis
                    scaleId="commits"
                    position="left"
                    legend="commits"
                    legendPosition="center"
                    legendOffset={-40}
                />
                <Axis scaleId="week" axis="x" position="bottom"/>
                <Bars xScale="week" x="week" yScale="commits" y="total" color="#fff"/>
            </Chart>
        )
    }
}
