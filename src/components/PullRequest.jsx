import React from 'react';


export default React.createClass({
    displayName: 'PullRequest',

    render() {
        return (
            <div className="list__item github__pull-request">
                <span className="github__pull-request__avatar">
                    <img src={this.props.pullRequest.user.avatar_url} />
                </span>
                {this.props.pullRequest.title}
            </div>
        );
    }
});
