import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveLine } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')

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
                animate={false}
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
