import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import PullRequest                     from './PullRequest.jsx';
import Mozaik                          from 'mozaik/browser';


class PullRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullRequests: []
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.pullRequests.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(pullRequests) {
        this.setState({
            pullRequests: pullRequests
        });
    }

    render() {
        let { pullRequests } = this.state;
        let { repository, title } = this.props

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> Pull Requests
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {pullRequests.length}
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {pullRequests.map(pullRequest => {
                        return <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                    })}
                </div>
            </div>
        );
    }
}

PullRequests.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(PullRequests.prototype, ListenerMixin);
reactMixin(PullRequests.prototype, Mozaik.Mixin.ApiConsumer);

export { PullRequests as default };
