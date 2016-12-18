/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes }  from 'react'
import { WidgetListItem, WidgetAvatar } from 'mozaik/ui'


export default class PullRequest extends Component {
    static propTypes = {
        pullRequest: PropTypes.shape({
            title: PropTypes.string.isRequired,
            user:  PropTypes.shape({
                avatar_url: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }

    render() {
        const { pullRequest } = this.props
        const { title, html_url, user } = pullRequest

        return (
            <WidgetListItem
                title={<a href={html_url} target="_blank">{title}</a>}
                pre={(
                    <WidgetAvatar href={user.html_url} size="4vmin">
                        <img src={user.avatar_url} />
                    </WidgetAvatar>
                )}
            />
        )
    }
}
