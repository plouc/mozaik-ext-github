import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';


class OrganizationBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: null
        };
    }

    getApiRequest() {
        let { organization } = this.props;

        return {
            id:     `github.organization.${ organization }`,
            params: {
                organization: organization
            }
        };
    }

    onApiData(organization) {
        this.setState({
            organization: organization
        });
    }

    render() {
        let { organization, title } = this.props;
        var titleNode = (
            <span>
                <span className="widget__header__subject">{title || organization}</span>
            </span>
        );
        var organizationNode = (
            <div className="widget__body" />
        );

        if (this.state.organization) {
            titleNode = title === undefined ? (
                <span>
                    <span className="widget__header__subject">{this.state.organization.name}</span>
                </span>
            ) : title;
            organizationNode = (
                <div className="widget__body">
                    <div className="github__organization-badge__banner">
                        <span className="github__organization-badge__avatar">
                            <img src={this.state.organization.avatar_url} />
                        </span>
                    </div>
                    <div className="github__organization-badge__description">
                        <span>{this.state.organization.description}</span>
                    </div>
                    <div className="github__organization-badge__info">
                        <div className="github__organization-badge__info__item">
                            <span className="count">{this.state.organization.public_repos}</span>&nbsp;
                            public repos
                        </div>
                        <div className="github__organization-badge__info__item">
                            <span className="count">{this.state.organization.public_gists}</span>&nbsp;
                            public gists
                        </div>
                        <div className="github__organization-badge__info__item">
                            <span className="count">{this.state.organization.followers}</span>&nbsp;
                            followers
                        </div>
                        <div className="github__organization-badge__info__item">
                            <span className="count">{this.state.organization.following}</span>&nbsp;
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
                {organizationNode}
            </div>
        );
    }
}

OrganizationBadge.propTypes = {
    organization: PropTypes.string.isRequired
};

reactMixin(OrganizationBadge.prototype, ListenerMixin);
reactMixin(OrganizationBadge.prototype, Mozaik.Mixin.ApiConsumer);

export { OrganizationBadge as default };
