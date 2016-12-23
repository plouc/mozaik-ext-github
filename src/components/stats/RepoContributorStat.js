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


export default class RepoContributorStat extends Component {
    static propTypes = {
        contributor: PropTypes.shape({
            total:  PropTypes.number.isRequired,
            author: PropTypes.shape({
                login:      PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired,
    }

    render() {
        const { contributor: { author, total } } = this.props

        return (
            <WidgetListItem
                title={
                    <a href={author.html_url} target="_blank">
                        {author.login}
                    </a>
                }
                pre={
                    <WidgetAvatar size="4vmin">
                        <img src={author.avatar_url}/>
                    </WidgetAvatar>
                }
                post={
                    <span>
                        {total}&nbsp;<i className="fa fa-dot-circle-o"/>
                    </span>
                }
            />
        )
    }
}
