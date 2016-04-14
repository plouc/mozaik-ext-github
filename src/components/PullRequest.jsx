import React, { Component, PropTypes } from 'react';


class PullRequest extends Component {
    render() {
        const { pullRequest } = this.props;
        const { title, html_url, user } = pullRequest;

        return (
            <div className="list__item github__pull-request">
                <a href={user.html_url} target="_blank" className="github__pull-request__avatar">
                    <img src={user.avatar_url} />
                </a>
                <a href={html_url} target="_blank">{title}</a>
            </div>
        );
    }
}

PullRequest.displayName = 'PullRequest';

PullRequest.propTypes = {
    pullRequest: PropTypes.shape({
        title: PropTypes.string.isRequired,
        user:  PropTypes.shape({
            avatar_url: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};


export default PullRequest;
