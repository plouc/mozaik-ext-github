import React, { Component, PropTypes } from 'react'


class OrganizationBadge extends Component {
    constructor(props) {
        super(props)

        this.state = { organization: null }
    }

    static getApiRequest({ organization }) {
        return {
            id:     `github.organization.${ organization }`,
            params: { organization }
        }
    }

    render() {
        const { organization, title } = this.props

        let titleNode = (
            <span>
                <span className="widget__header__subject">{title || organization}</span>
            </span>
        )

        let organizationNode = (
            <div className="widget__body" />
        )

        if (this.state.organization) {
            titleNode = title === undefined ? (
                <span>
                    <span className="widget__header__subject">{this.state.organization.name}</span>
                </span>
            ) : title

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
            )
        }

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github-alt" />
                </div>
                {organizationNode}
            </div>
        )
    }
}

OrganizationBadge.propTypes = {
    organization: PropTypes.string.isRequired,
    title:        PropTypes.string
}


export default OrganizationBadge
