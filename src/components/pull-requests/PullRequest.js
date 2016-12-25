/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes }  from 'react'
import moment                           from 'moment'
import { WidgetListItem, WidgetAvatar } from 'mozaik/ui'


export default class PullRequest extends Component {
    static propTypes = {
        pullRequest: PropTypes.shape({
            title:      PropTypes.string.isRequired,
            html_url:   PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            user:       PropTypes.shape({
                html_url:   PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
                login:      PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired
    }

    render() {
        const { pullRequest } = this.props
        const {
            title,
            html_url,
            created_at,
            user,
        } = pullRequest

        return (
            <WidgetListItem
                title={
                    <span>
                        <a href={html_url} target="_blank">{title}</a> by <a href={user.html_url} target="_blank">{user.login}</a>
                    </span>
                }
                pre={(
                    <WidgetAvatar href={user.html_url} size="4vmin">
                        <img src={user.avatar_url} alt={user.login}/>
                    </WidgetAvatar>
                )}
                meta={
                    <span>
                        <i className="fa fa-clock-o"/>&nbsp;
                        {moment(created_at).fromNow()}
                    </span>
                }
            />
        )
    }
}
