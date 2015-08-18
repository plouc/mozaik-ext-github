import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class TopCommitter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topCommitter: null,
            since:        null,
            until:        null
        };
    }

    getApiRequest() {
        let { repository, frequency } = this.props;

        let since;
        let until;

        if (frequency === 'weekly') {
            since = moment().startOf('week');
            until = moment().endOf('week');
        } else {
            since = moment().startOf('day');
            until = moment().endOf('day');
        }

        since = since.format();
        until = until.format();

        //console.log('SINCE', since);
        //console.log('UNTIL', until);

        return {
            id:     `github.repositoryCommits.${ repository }.${ since }.${ until }`,
            params: {
                repository: repository,
                since:      since,
                until:      until
            }
        };
    }

    onApiData(commits) {
        if (commits.length === 0 || !_.isObject(commits)) {
            return;
        }

        let committers = _.values(_.reduce(commits, (result, commit) => {
            if (commit.committer) {
                if (!result[commit.committer.login]) {
                    result[commit.committer.login] = {
                        user:        commit.committer,
                        commitCount: 0
                    };
                }

                result[commit.committer.login].commitCount++;
            }

            return result;
        }, {}));

        if (committers.length === 0) {
            return;
        }

        let topCommiter = _.max(committers, 'commitCount');
        topCommiter = _.extend(topCommiter.user, { commitCount: topCommiter.commitCount });

        this.setState({
            topCommitter: topCommiter
        });
    }

    render() {
        let { repository }   = this.props;
        let { topCommitter } = this.state;

        let topCommitterNode = <div className="widget__body"/>;
        if (topCommitter) {
            topCommitterNode = (
                <div className="widget__body">
                    <div className="github__top-committer__avatar">
                        <img src={topCommitter.avatar_url} />
                    </div>
                    <div className="github__top-committer__info">
                        {topCommitter.login}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{repository}</span>&nbsp;top committer
                    <i className="fa fa-github-alt" />
                </div>
                {topCommitterNode}
            </div>
        );
    }
}

TopCommitter.propTypes = {
    repository: PropTypes.string.isRequired,
    frequency:  PropTypes.oneOf(['daily', 'weekly'])
};

TopCommitter.defaultProps = {
    frequency: 'daily'
};

reactMixin(TopCommitter.prototype, ListenerMixin);
reactMixin(TopCommitter.prototype, Mozaik.Mixin.ApiConsumer);

export { TopCommitter as default };
