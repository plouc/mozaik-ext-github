import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')

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
                axes={{
                    left: {
                        enabled: true,
                    },
                    bottom: {
                        enabled: true,
                        format,
                    },
                }}
            />
        )
    }
}
