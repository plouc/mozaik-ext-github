/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes } from 'react'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel as Label,
} from 'mozaik/ui'


export default class RepoBadge extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.object,
        apiError:   PropTypes.object,
        showKeys:   PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
        showKeys: [
            'description',
        ],
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.repository.${ repository }`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, apiData: repoInfo, apiError } = this.props

        let body = <WidgetLoader />
        if (repoInfo) {
            const labelStyle = { width: '48%', marginBottom: '1vmin' }

            body = (
                <div
                    style={{
                        padding:        '1.6vmin',
                        display:        'flex',
                        justifyContent: 'center',
                        alignItems:     'stretch',
                        alignContent:   'stretch',
                        flexDirection:  'column',
                    }}
                >
                    <div
                        style={{
                            padding:   '2vmin 0',
                            textAlign: 'center',
                        }}
                    >
                        {repoInfo.description}
                    </div>
                    <div
                        style={{
                            display:        'flex',
                            flexWrap:       'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Label
                            label="homepage"
                            suffix={
                                <a href={repoInfo.homepage} target="_blank">
                                    {repoInfo.homepage}
                                </a>
                            }
                            style={{
                                ...labelStyle,
                                width: '100%',
                            }}
                        />
                        <Label
                            label="default branch"
                            suffix={repoInfo.default_branch}
                            style={{
                                ...labelStyle,
                                width: '100%',
                            }}
                        />
                        <Label
                            label="issues"
                            suffix={repoInfo.open_issues_count}
                            style={labelStyle}
                        />
                        <Label
                            label="watchers"
                            suffix={repoInfo.watchers_count}
                            style={labelStyle}
                        />
                        <Label
                            label="subscribers"
                            suffix={repoInfo.subscribers_count}
                            style={labelStyle}
                        />
                        <Label
                            label="size"
                            suffix={repoInfo.size}
                            style={labelStyle}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Repository'}
                    subject={title ? null : repository}
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
