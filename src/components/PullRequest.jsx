import React, { PropTypes } from 'react';


const PullRequest = ({ pullRequest }) => (
    <div className="list__item github__pull-request">
        <span className="github__pull-request__avatar">
            <img src={pullRequest.user.avatar_url} />
        </span>
        {pullRequest.title}
    </div>
);

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
