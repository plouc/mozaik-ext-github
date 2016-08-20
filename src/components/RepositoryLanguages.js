import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import {
    Chart,
    Pie,
    PieColumnLegends,
    PieRadialLegends,
    PieSliceLegends,
} from 'nivo'


const labelFn = d => d.data.value

class RepositoryLanguages extends Component {
    constructor(props) {
        super(props)

        this.state = { languages: [] }
    }

    componentWillMount() {
        setInterval(() => {
            const languages = {}
            _.shuffle(['php', 'make', 'css', 'javascript', 'go', 'erlang', 'elixir', 'lisp', 'java', 'jsx']).slice(0, 3 + Math.round(Math.random() * 6)).map(language => {
                languages[language] = Math.round(Math.random() * 600)
            })

            this.setState({ languages })
        }, 4000)
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.repositoryLanguages.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, title } = this.props
        const { languages }         = this.state


        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> languages
            </span>
        ) : title

        const languagesItems = _.map(languages, (value, label) => ({ label, value }))

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {languagesItems.length}
                    </span>
                    <i className="fa fa-code" />
                </div>
                <div className="widget__body">
                    <Chart margin={{ top: 40, right: 120, bottom: 40, left: 120 }}>
                        <Pie data={languagesItems} innerRadius={0.6}>
                            <PieColumnLegends
                                textColor="inherit"
                                lineColor="inherit"
                            />
                            <PieSliceLegends
                                orient={true} radius={20} labelFn={labelFn}
                                badgeColor="inherit:darker(1)" textColor="inherit:brighter(1)"
                            />
                        </Pie>
                    </Chart>
                </div>
            </div>
        )
    }
}

RepositoryLanguages.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
}


export default RepositoryLanguages
