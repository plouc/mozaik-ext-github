import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveLine } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }

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
                axes={{
                    left: {
                        enabled: true,
                        legend: 'commits',
                        legendPosition: 'center',
                        legendOffset: -40,
                    },
                    bottom: {
                        enabled: true,
                    },
                }}
            />
        )
    }
}
