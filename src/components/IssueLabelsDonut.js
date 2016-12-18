/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import {
    Pie,
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


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
        const { title, repository, apiData: issues, apiError } = this.props

        const labels = aggregateIssueLabels(issues)

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> issue labels
            </span>
        ) : title

        return (
            <div>
                <WidgetHeader
                    title="issue labels"
                    subject={repository}
                    icon="github"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <Pie data={labels} innerRadius={0.7} transitionDuration={2000}/>
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}

IssueLabelsDonut.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.array.isRequired,
    apiError:   PropTypes.object,
}

IssueLabelsDonut.defaultProps = {
    apiData: [],
}


export default IssueLabelsDonut
