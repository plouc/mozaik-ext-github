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
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel,
    WidgetAvatar,
} from 'mozaik/ui'


export default class UserBadge extends Component {
    static propTypes = {
        user:     PropTypes.string.isRequired,
        title:    PropTypes.string,
        apiData:  PropTypes.shape({

        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ user }) {
        return {
            id:     `github.user.${ user }`,
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
                        padding:        '1.6vmin',
                        display:        'flex',
                        justifyContent: 'center',
                        alignContent:   'stretch',
                        flexDirection:  'column',
                        width:          '100%',
                        height:         '100%',
                    }}
                >
                    <div
                        style={{
                            height:         '40%',
                            display:        'flex',
                            justifyContent: 'center',
                            alignItems:     'center',
                        }}
                    >
                        <a href={user.html_url} target="_blank">
                            <WidgetAvatar size="7vmin">
                                <img src={user.avatar_url} alt={this.props.user} />
                            </WidgetAvatar>
                        </a>
                    </div>
                    <div
                        style={{
                            display:        'flex',
                            flexWrap:       'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <WidgetLabel
                            label={<a href={`${user.html_url}?tab=repositories`} target="_blank">public repos</a>}
                            prefix={user.public_repos}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="public gists"
                            prefix={user.public_gists}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label={<a href={`${user.html_url}/followers`} target="_blank">followers</a>}
                            prefix={user.followers}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label={<a href={`${user.html_url}/following`} target="_blank">following</a>}
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
