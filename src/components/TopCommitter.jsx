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
        const { repository, frequency } = this.props;

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

        return {
            id:     `github.repositoryCommits.${ repository }.${ since }.${ until }`,
            params: { repository, since, until }
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

        let topCommitter = _.max(committers, 'commitCount');
        topCommitter = _.extend(topCommitter.user, { commitCount: topCommitter.commitCount });

        this.setState({ topCommitter });
    }

    render() {
        const { repository, title } = this.props;
        const { topCommitter }      = this.state;

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

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> top committer
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github-alt" />
                </div>
                {topCommitterNode}
            </div>
        );
    }
}

TopCommitter.displayName = 'TopComitter';

TopCommitter.propTypes = {
    repository: PropTypes.string.isRequired,
    frequency:  PropTypes.oneOf(['daily', 'weekly']),
    title:      PropTypes.string
};

TopCommitter.defaultProps = {
    frequency: 'daily'
};

reactMixin(TopCommitter.prototype, ListenerMixin);
reactMixin(TopCommitter.prototype, Mozaik.Mixin.ApiConsumer);


export default TopCommitter;
