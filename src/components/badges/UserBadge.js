import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GithubIcon from 'react-icons/lib/fa/github-alt'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel,
    WidgetAvatar,
    ExternalLink,
} from '@mozaik/ui'

export default class UserBadge extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({}),
        apiError: PropTypes.object,
    }

    static getApiRequest({ user }) {
        return {
            id: `github.user.${user}`,
            params: { user },
        }
    }

    render() {
        const { title, apiData: user, apiError } = this.props

        let body = <WidgetLoader />
        if (user) {
            body = (
                <div
                    style={{
                        padding: '1.6vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'stretch',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            height: '40%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ExternalLink href={user.html_url}>
                            <WidgetAvatar size="7vmin">
                                <img src={user.avatar_url} alt={this.props.user} />
                            </WidgetAvatar>
                        </ExternalLink>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <WidgetLabel
                            label={
                                <ExternalLink href={`${user.html_url}?tab=repositories`}>
                                    public repos
                                </ExternalLink>
                            }
                            prefix={user.public_repos}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="public gists"
                            prefix={user.public_gists}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label={
                                <ExternalLink href={`${user.html_url}/followers`}>
                                    followers
                                </ExternalLink>
                            }
                            prefix={user.followers}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label={
                                <ExternalLink href={`${user.html_url}/following`}>
                                    following
                                </ExternalLink>
                            }
                            prefix={user.following}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="company"
                            suffix={user.company}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'GitHub User'}
                    subject={title ? null : this.props.user}
                    icon={GithubIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
