import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { WidgetListItem, WidgetAvatar, ExternalLink } from '@mozaik/ui'

export default class PullRequest extends Component {
    static propTypes = {
        pullRequest: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html_url: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            user: PropTypes.shape({
                html_url: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
                login: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }

    render() {
        const { pullRequest } = this.props
        const { title, html_url, created_at, user } = pullRequest

        return (
            <WidgetListItem
                title={
                    <span>
                        <ExternalLink href={html_url}>{title}</ExternalLink> by{' '}
                        <ExternalLink href={user.html_url}>{user.login}</ExternalLink>
                    </span>
                }
                pre={
                    <WidgetAvatar href={user.html_url} size="4vmin">
                        <img src={user.avatar_url} alt={user.login} />
                    </WidgetAvatar>
                }
                meta={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <ClockIcon />
                        &nbsp;
                        {moment(created_at).fromNow()}
                    </span>
                }
            />
        )
    }
}
