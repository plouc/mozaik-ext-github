import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';


class OrgBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            org: null
        };
    }

    getApiRequest() {
        let { org } = this.props;

        return {
            id:     `github.org.${ org }`,
            params: {
                org: org
            }
        };
    }

    onApiData(org) {
        this.setState({
            org: org
        });
    }

    render() {
        let { org, title } = this.props;
        var titleNode = (
            <span>
                <span className="widget__header__subject">{title || org}</span>
            </span>
        );
        var orgNode = (
            <div className="widget__body" />
        );

        if (this.state.org) {
            titleNode = title === undefined ? (
                <span>
                    <span className="widget__header__subject">{this.state.org.name}</span>
                </span>
            ) : title;
            orgNode = (
                <div className="widget__body">
                    <div className="github__org-badge__banner">
                        <span className="github__org-badge__avatar">
                            <img src={this.state.org.avatar_url} />
                        </span>
                    </div>
                    <div className="github__org-badge__description">
                        <span>{this.state.org.description}</span>
                    </div>
                    <div className="github__org-badge__info">
                        <div className="github__org-badge__info__item">
                            <span className="count">{this.state.org.public_repos}</span>&nbsp;
                            public repos
                        </div>
                        <div className="github__org-badge__info__item">
                            <span className="count">{this.state.org.public_gists}</span>&nbsp;
                            public gists
                        </div>
                        <div className="github__org-badge__info__item">
                            <span className="count">{this.state.org.followers}</span>&nbsp;
                            followers
                        </div>
                        <div className="github__org-badge__info__item">
                            <span className="count">{this.state.org.following}</span>&nbsp;
                            following
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github-alt" />
                </div>
                {orgNode}
            </div>
        );
    }
}

OrgBadge.propTypes = {
    org: PropTypes.string.isRequired
};

reactMixin(OrgBadge.prototype, ListenerMixin);
reactMixin(OrgBadge.prototype, Mozaik.Mixin.ApiConsumer);

export { OrgBadge as default };
