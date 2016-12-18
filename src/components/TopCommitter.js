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
import _                               from 'lodash'
import moment                          from 'moment'
import { WidgetHeader, WidgetBody }    from 'mozaik/ui'


class TopCommitter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topCommitter: null,
            since:        null,
            until:        null,
        }
    }

    static getApiRequest({ repository, frequency }) {
        let since
        let until

        if (frequency === 'weekly') {
            since = moment().startOf('week')
            until = moment().endOf('week')
        } else {
            since = moment().startOf('day')
            until = moment().endOf('day')
        }

        since = since.format()
        until = until.format()

        return {
            id:     `github.repositoryCommits.${ repository }.${ since }.${ until }`,
            params: { repository, since, until }
        }
    }

    onApiData(commits) {
        if (commits.length === 0 || !_.isObject(commits)) {
            return
        }

        let committers = _.values(_.reduce(commits, (result, commit) => {
            if (commit.committer) {
                if (!result[commit.committer.login]) {
                    result[commit.committer.login] = {
                        user:        commit.committer,
                        commitCount: 0
                    }
                }

                result[commit.committer.login].commitCount++
            }

            return result
        }, {}))

        if (committers.length === 0) {
            return
        }

        let topCommitter = _.max(committers, 'commitCount')
        topCommitter = _.extend(topCommitter.user, { commitCount: topCommitter.commitCount })

        this.setState({ topCommitter })
    }

    render() {
        const { repository, title } = this.props
        const { topCommitter }      = this.state

        let topCommitterNode = <WidgetBody />
        if (topCommitter) {
            topCommitterNode = (
                <WidgetBody>
                    <div className="github__top-committer__avatar">
                        <img src={topCommitter.avatar_url} />
                    </div>
                    <div className="github__top-committer__info">
                        {topCommitter.login}
                    </div>
                </WidgetBody>
            )
        }

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> top committer
            </span>
        ) : title

        return (
            <div>
                <WidgetHeader
                    title="top committer"
                    subject={repository}
                    icon="githuub-alt"
                />
                {topCommitterNode}
            </div>
        )
    }
}

TopCommitter.propTypes = {
    repository: PropTypes.string.isRequired,
    frequency:  PropTypes.oneOf(['daily', 'weekly']),
    title:      PropTypes.string,
}

TopCommitter.defaultProps = {
    frequency: 'daily',
}


export default TopCommitter
