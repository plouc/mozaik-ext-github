import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel as Label,
    ExternalLink,
    GithubIcon,
} from '@mozaik/ui'

export default class RepoBadge extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.object,
        apiError: PropTypes.object,
        showKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
        showKeys: ['description'],
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.repository.${repository}`,
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        alignContent: 'stretch',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            padding: '2vmin 0',
                            textAlign: 'center',
                        }}
                    >
                        {repoInfo.description}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Label
                            label="homepage"
                            suffix={
                                <ExternalLink href={repoInfo.homepage}>
                                    {repoInfo.homepage}
                                </ExternalLink>
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
                        <Label label="size" suffix={repoInfo.size} style={labelStyle} />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Repository'}
                    subject={title ? null : repository}
                    icon={GithubIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
