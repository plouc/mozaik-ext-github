import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { Pie }                         from 'mozaik/ui'


const aggregateIssueLabels = issues => {
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

    return labels
}

class IssueLabelsDonut extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.issues.${ repository }`,
            params: { repository }
        }
    }

    render() {
        const { title, repository, apiData: issues } = this.props

        const labels = aggregateIssueLabels(issues)

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
    apiData:    PropTypes.array.isRequired,
}

IssueLabelsDonut.defaultProps = {
    apiData: [],
}


export default IssueLabelsDonut
