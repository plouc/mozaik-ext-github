/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes }  from 'react'
import { WidgetListItem, WidgetAvatar } from 'mozaik/ui'


export const BranchPropType = PropTypes.shape({
    name:   PropTypes.string.isRequired,
    _links: PropTypes.shape({
        html: PropTypes.string.isRequired,
    }).isRequired,
    commit: PropTypes.shape({
        author: PropTypes.shape({
            login:      PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            html_url:   PropTypes.string.isRequired,
        }),
    }),
})


export default class Branch extends Component {
    static propTypes = {
        branch: BranchPropType.isRequired,
    }

    render() {
        const { branch } = this.props
        const { commit } = branch

        return (
            <WidgetListItem
                title={(
                    <span>
                        <a href={branch._links.html} target="_blank">{branch.name}</a>&nbsp;
                        {commit && commit.author && (
                            <span>
                                by <a href={commit.author.html_url} target="_blank">{commit.author.login}</a>
                            </span>
                        )}
                    </span>
                )}
                post={commit && commit.author && (
                    <WidgetAvatar href={commit.author.html_url} size="4vmin">
                        <img src={commit.author.avatar_url} alt={commit.author.login}/>
                    </WidgetAvatar>
                )}
            />
        )
    }
}
