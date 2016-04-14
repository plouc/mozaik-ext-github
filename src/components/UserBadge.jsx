import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class UserBadge extends Component {
    constructor(props) {
        super(props);

        this.state = { user: null };
    }

    getApiRequest() {
        const { user } = this.props;

        return {
            id:     `github.user.${ user }`,
            params: { user }
        };
    }

    onApiData(user) {
        this.setState({ user });
    }

    render() {
        let userNode = (
            <div className="widget__body" />
        );

        if (this.state.user) {
            const { user } = this.state;

            userNode = (
                <div className="widget__body">
                    <div className="github__user-badge__banner">
                        <a href={user.html_url} target="_blank" className="github__user-badge__avatar">
                            <img src={user.avatar_url} />
                        </a>
                    </div>
                    <div className="github__user-badge__info">
                        <a href={`${user.html_url}?tab=repositories`} target="_blank" className="label__group">
                            <span className="label__addon">
                                {user.public_repos}
                            </span>
                            <span className="label">
                                public repos
                            </span>
                        </a>
                        <span className="label__group">
                            <span className="label__addon">
                                {user.public_gists}
                            </span>
                            <span className="label">
                                public gists
                            </span>
                        </span>
                        <a href={`${user.html_url}/followers`} target="_blank" className="label__group">
                            <span className="label__addon">
                                {user.followers}
                            </span>
                            <span className="label">
                                followers
                            </span>
                        </a>
                        <a href={`${user.html_url}/following`} target="_blank" className="label__group">
                            <span className="label__addon">
                                {user.following}
                            </span>
                            <span className="label">
                                following
                            </span>
                        </a>
                        <span className="label__group">
                            <span className="label">
                                company
                            </span>
                            <span className="label__addon">
                                {user.company}
                            </span>
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.user}</span> github user
                    <i className="fa fa-github-alt" />
                </div>
                {userNode}
            </div>
        );
    }
}

UserBadge.propTypes = {
    user: PropTypes.string.isRequired
};

reactMixin(UserBadge.prototype, ListenerMixin);
reactMixin(UserBadge.prototype, Mozaik.Mixin.ApiConsumer);


export default UserBadge;
