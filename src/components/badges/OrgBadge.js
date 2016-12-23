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
    WidgetLabel,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetAvatar,
} from 'mozaik/ui'


export default class OrgBadge extends Component {
    static propTypes = {
        organization: PropTypes.string.isRequired,
        title:        PropTypes.string,
        apiData:      PropTypes.shape({}),
    }

    static getApiRequest({ organization }) {
        return {
            id:     `github.organization.${ organization }`,
            params: { organization }
        }
    }

    render() {
        const {
            organization,
            title,
            apiData: orgInfo,
            apiError,
        } = this.props

        let body = <WidgetLoader />
        if (orgInfo) {
            body = (
                <div
                    style={{
                        padding:        '1.6vmin',
                        display:        'flex',
                        justifyContent: 'center',
                        alignItems:     'stretch',
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
                        <a href={orgInfo.html_url} target="_blank">
                            <WidgetAvatar size="7vmin">
                                <img src={orgInfo.avatar_url} alt={this.props.organization} />
                            </WidgetAvatar>
                        </a>
                    </div>
                    <div
                        style={{
                            padding:   '2vmin',
                            textAlign: 'center',
                        }}
                    >
                        {orgInfo.description}
                    </div>
                    <div
                        style={{
                            display:        'flex',
                            flexWrap:       'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <WidgetLabel
                            label={<a href={`${orgInfo.html_url}`} target="_blank">public repos</a>}
                            prefix={orgInfo.public_repos}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="public gists"
                            prefix={orgInfo.public_gists}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="followers"
                            prefix={orgInfo.followers}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="following"
                            prefix={orgInfo.following}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'organization'}
                    subject={title ? null : organization}
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
