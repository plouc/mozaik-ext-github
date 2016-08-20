import React, { Component, PropTypes } from 'react'
/*
import {
    Chart,
    AreaShape,
    LineShape,
    XYScales,
    AxisX,
    AxisY
} from 'nivo'
*/


class ParticipationStats extends Component {
    constructor(props) {
        super(props)

        this.state = {
            participation: { all: [], owner: [] }
        }
    }

    componentWillMount() {
        setInterval(() => {
            const t = []
            const max = 100 + Math.random() * 600
            for (let i = 0; i < 20; i++) {
                t.push(Math.random() * max)
            }

            this.setState({
                participation: { all: t }
            })
        }, 6000)
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.repositoryParticipationStats.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, title } = this.props
        const { participation }     = this.state

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> participation
            </span>
        ) : title

        const interpolation = 'cardinal'

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-dot-circle-o" />
                </div>
                <div className="widget__body">
                    <Chart margin={{ top: 50, right: 40, bottom: 40, left: 40 }}>
                        <XYScales data={participation.all}>
                            <AxisX />
                            <AxisY tickMode="grid" tickPadding={8} />
                            <AreaShape interpolation={interpolation} />
                            <LineShape interpolation={interpolation} />
                        </XYScales>
                    </Chart>
                    <a
                        href={`https://github.com/${repository}/graphs/contributors`}
                        target="_blank"
                        className="github__participation-stats__range"
                    >
                        <i className="fa fa-calendar-o" /> april 2015 / april 2016
                    </a>
                </div>
            </div>
        )
    }
}

ParticipationStats.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
}


export default ParticipationStats
