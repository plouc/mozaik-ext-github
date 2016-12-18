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
import {
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'
import {
    ResponsiveTreeMapPlaceholders
} from 'nivo'


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

        console.log(labels)

        const data = labels.map(label => ({
            label: label.name,
            count: label.count,
            bg:    label.color,
        }))

        return (
            <div>
                <WidgetHeader
                    title="GitHub issues types"
                    icon="github"
                />
                <WidgetBody>
                    <ResponsiveTreeMapPlaceholders
                        value="count"
                        identity="label"
                        namespace="html"
                        animate={false}
                        leavesOnly={true}
                        root={{
                            label:    'test',
                            children: data,
                        }}
                    >
                        {(nodes) => {
                            return nodes.map(node => {
                                console.log(node)
                                return (
                                    <div
                                        key={node.data.key}
                                        style={{
                                            position:   'absolute',
                                            top:        node.style.y,
                                            left:       node.style.x,
                                            width:      node.style.width,
                                            height:     node.style.height,
                                            background: node.data.bg,
                                            color: '#000'
                                        }}
                                    >
                                        {node.key} {node.data.value}
                                    </div>
                                )
                            })
                        }}
                    </ResponsiveTreeMapPlaceholders>
                </WidgetBody>
            </div>
        )
    }
}

IssueLabelsTreemap.propTypes = {
    repository: PropTypes.string.isRequired,
    labels:     PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string,
        color: PropTypes.string,
    })).isRequired,
    apiData: PropTypes.arrayOf(
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
