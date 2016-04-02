import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import PullRequest                     from './PullRequest.jsx';
import Mozaik                          from 'mozaik/browser';


class PullRequests extends Component {
    constructor(props) {
        super(props);

        this.state = { pullRequests: [] };
    }

    getApiRequest() {
        const { repository } = this.props;

        return {
            id:     `github.pullRequests.${ repository }`,
            params: { repository }
        };
    }

    onApiData(pullRequests) {
        this.setState({ pullRequests });
    }

    render() {
        const { pullRequests }      = this.state;
        const { repository, title } = this.props

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
                    {pullRequests.map(pullRequest => (
                        <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                    ))}
                </div>
            </div>
        );
    }
}

PullRequests.displayName = 'PullRequests';

PullRequests.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(PullRequests.prototype, ListenerMixin);
reactMixin(PullRequests.prototype, Mozaik.Mixin.ApiConsumer);


export default PullRequests;
