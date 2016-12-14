import React, { Component, PropTypes } from 'react'
import { TrapApiError }                from 'mozaik/ui'


class UserBadge extends Component {
    static getApiRequest({ user }) {
        return {
            id:     `github.user.${ user }`,
            params: { user },
        }
    }

    render() {
        let userNode = (
            <div className="widget__body" />
        )

        const { apiData: user, apiError } = this.props

        if (user) {
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
            )
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.user}</span> github user
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <TrapApiError error={apiError}>
                    {userNode}
                </TrapApiError>
            </div>
        )
    }
}

UserBadge.propTypes = {
    user:     PropTypes.string.isRequired,
    apiData:  PropTypes.shape({

    }),
    apiError: PropTypes.object,
}


export default UserBadge
