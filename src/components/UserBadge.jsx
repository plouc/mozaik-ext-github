import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';


class UserBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    getApiRequest() {
        let { user } = this.props;

        return {
            id:     `github.user.${ user }`,
            params: {
                user: user
            }
        };
    }

    onApiData(user) {
        this.setState({
            user: user
        });
    }

    render() {
        var userNode = (
            <div className="widget__body" />
        );

        if (this.state.user) {
            userNode = (
                <div className="widget__body">
                    <div className="github__user-badge__banner">
                        <span className="github__user-badge__avatar">
                            <img src={this.state.user.avatar_url} />
                        </span>
                    </div>
                    <div className="github__user-badge__info">
                        <span className="label__group">
                            <span className="label__addon">
                                {this.state.user.public_repos}
                            </span>
                            <span className="label">
                                public repos
                            </span>
                        </span>
                        <span className="label__group">
                            <span className="label__addon">
                                {this.state.user.public_gists}
                            </span>
                            <span className="label">
                                public gists
                            </span>
                        </span>
                        <span className="label__group">
                            <span className="label__addon">
                                {this.state.user.followers}
                            </span>
                            <span className="label">
                                followers
                            </span>
                        </span>
                        <span className="label__group">
                            <span className="label__addon">
                                {this.state.user.following}
                            </span>
                            <span className="label">
                                following
                            </span>
                        </span>
                        <span className="label__group">
                            <span className="label">
                                company
                            </span>
                            <span className="label__addon">
                                {this.state.user.company}
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

export { UserBadge as default };
