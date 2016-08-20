import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Mozaik                          from 'mozaik/ui'
const  { Pie }                         = Mozaik


class IssueLabelsDonut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total:  0,
            labels: []
        }
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.issues.${ repository }`,
            params: { repository }
        }
    }

    componentWillMount() {
        setInterval(() => {
            const colors = {
                php:        '#F9087A',
                make:       '#FF0000',
                css:        '#9F0900',
                javascript: '#aFa990',
                erlang:     '#0F9940',
                elixir:     '#00a980',
                go:         '#ce99d0',
                lisp:       '#ae99a0',
                java:       '#Fe69a0',
                jsx:        '#FF69a0',
            }
            const labels = _.shuffle(Object.keys(colors)).slice(0, 3 + Math.round(Math.random() * 6)).map(label => {
                return {
                    id:    label,
                    label,
                    count: Math.round(Math.random() * 12),
                    color: colors[label]
                }
            })

            this.setState({ labels })
        }, 4000)
    }

    onApiData(issues) {
        const labels = []

        issues.forEach(issue => {
            issue.labels.forEach(label => {
                let existing = _.find(labels, { id: label.name })
                if (!existing) {
                    existing = _.assign({}, label, {
                        id:    label.name,
                        label: label.name,
                        count: 0,
                        color: `#${label.color}`
                    })
                    labels.push(existing)
                }
                existing.count++
            })
        })

        this.setState({ labels })
    }

    render() {
        const { title, repository } = this.props
        const { labels }            = this.state

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> issue labels
            </span>
        ) : title

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Pie data={labels} innerRadius={0.7} transitionDuration={2000}/>
                </div>
            </div>
        )
    }
}

IssueLabelsDonut.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
}


export default IssueLabelsDonut
