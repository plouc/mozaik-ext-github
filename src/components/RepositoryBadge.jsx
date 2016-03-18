import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';


class RepositoryBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repository: null
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.repository.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(repository) {
        this.setState({
            repository: repository
        });
    }

    render() {
        let { repository, title } = this.props;
        var titleNode = (
            <span>
                <span className="widget__header__subject">{title || repository}</span>
            </span>
        );
        var repositoryNode = (
            <div className="widget__body" />
        );

        if (this.state.repository) {
            titleNode = title === undefined ? (
                <span>
                    <span className="widget__header__subject">{this.state.repository.name}</span>
                </span>
            ) : title;
            var date = this.state.repository.updated_at.split('T')[0];
            repositoryNode = (
                <div className="widget__body">
                    <div className="github__repository-badge__description">
                        <span>{this.state.repository.description}</span>
                    </div>
                    <div className="github__repository-badge__info">
                        <div className="github__repository-badge__info__item">
                            <span className="count">{this.state.repository.open_issues_count}</span>&nbsp;
                            issues
                        </div>
                        <div className="github__repository-badge__info__item">
                            <span className="count">{this.state.repository.size}</span>&nbsp;
                            size
                        </div>
                        <div className="github__repository-badge__info__item">
                            <span className="count">{this.state.repository.watchers_count}</span>&nbsp;
                            watchers
                        </div>
                        <div className="github__repository-badge__info__item">
                            <span className="count">{this.state.repository.subscribers_count}</span>&nbsp;
                            subscribers
                        </div>
                        <div className="github__repository-badge__info__item">
                            default branch<br/>
                            <span className="count">{this.state.repository.default_branch}</span>&nbsp;
                        </div>
                        <div className="github__repository-badge__info__item">
                            updated at<br/>
                            <span className="count">{date}</span>&nbsp;
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
                {repositoryNode}
            </div>
        );
    }
}

RepositoryBadge.propTypes = {
    repository: PropTypes.string.isRequired
};

reactMixin(RepositoryBadge.prototype, ListenerMixin);
reactMixin(RepositoryBadge.prototype, Mozaik.Mixin.ApiConsumer);

export { RepositoryBadge as default };
