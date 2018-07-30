import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DotIcon from 'react-icons/lib/fa/dot-circle-o'
import { WidgetListItem, WidgetAvatar, ExternalLink } from '@mozaik/ui'

export default class RepoContributorStat extends Component {
    static propTypes = {
        contributor: PropTypes.shape({
            total: PropTypes.number.isRequired,
            author: PropTypes.shape({
                login: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }

    render() {
        const {
            contributor: { author, total },
        } = this.props

        return (
            <WidgetListItem
                title={
                    <ExternalLink href={author.html_url} target="_blank">
                        {author.login}
                    </ExternalLink>
                }
                pre={
                    <WidgetAvatar size="4vmin">
                        <img src={author.avatar_url} alt={author.login} />
                    </WidgetAvatar>
                }
                post={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {total}
                        &nbsp;
                        <DotIcon />
                    </span>
                }
            />
        )
    }
}
