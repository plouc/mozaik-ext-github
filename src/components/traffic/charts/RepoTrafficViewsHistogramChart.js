import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const format = d => moment(d).format('MM/DD')

export default class RepoTrafficViewsHistogramChart extends Component {
    static propTypes = {
        views: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { views, theme } = this.props

        return (
            <ResponsiveBar
                margin={margin}
                data={views}
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
