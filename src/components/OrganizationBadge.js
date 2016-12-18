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
    WidgetLabel,
    WidgetHeader,
    WidgetBody,
    WidgetAvatar,
} from 'mozaik/ui'


class OrganizationBadge extends Component {
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
        } = this.props

        let organizationNode = <WidgetBody />

        if (orgInfo) {
            organizationNode = (
                <WidgetBody
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
                </WidgetBody>
            )
        }

        return (
            <div>
                <WidgetHeader
                    title="organization"
                    subject={organization || ''}
                    icon="github-alt"
                />
                {organizationNode}
            </div>
        )
    }
}

OrganizationBadge.propTypes = {
    organization: PropTypes.string.isRequired,
    title:        PropTypes.string,
    apiData:      PropTypes.shape({

    }),
}


export default OrganizationBadge
