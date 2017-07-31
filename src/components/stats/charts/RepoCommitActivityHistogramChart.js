import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }

export default class RepoCommitActivityHistogramChart extends Component {
    static propTypes = {
        commits: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { commits, theme } = this.props

        return (
            <ResponsiveBar
                margin={margin}
                data={commits}
                theme={theme.charts}
                animate={false}
                enableGridX={false}
                paddingX={0.2}
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
