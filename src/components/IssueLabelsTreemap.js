import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/ui'
const  { Treemap }                     = Mozaik


class IssueLabelsTreemap extends Component {
    static getApiRequest({ labels, repository }) {
        const labelNames = labels.map(label => label.name)

        return {
            id:     `github.issueLabelsAggregations.${ labelNames.join('.') }`,
            params: { repository, labels }
        }
    }

    render() {
        const { apiData: labels } = this.props

        const data = labels.map(label => ({
            label: label.name,
            count: label.count,
            color: label.color,
        }))

        return (
            <div>
                <div className="widget__header">
                    Github issues types
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Treemap data={{ children: data }} showCount={true} />
                </div>
            </div>
        )
    }
}

IssueLabelsTreemap.propTypes = {
    repository: PropTypes.string.isRequired,
    labels:     PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string,
        color: PropTypes.string
    })).isRequired,
    apiData:    PropTypes.arrayOf(
        PropTypes.shape({
            name:  PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ),
}

IssueLabelsTreemap.defaultProps = {
    apiData: [],
}


export default IssueLabelsTreemap
