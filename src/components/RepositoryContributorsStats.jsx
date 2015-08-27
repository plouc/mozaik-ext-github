import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import RepositoryContributorStat       from './RepositoryContributorStat.jsx';
import Mozaik                          from 'mozaik/browser';


class RepositoryContributorsStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: []
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.repositoryContributorsStats.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(contributors) {
        contributors.sort((contribA, contribB) => {
            return contribB.total - contribA.total;
        });

        this.setState({
            contributors: contributors
        });
    }

    render() {
        let { repository, title } = this.props;
        let { contributors }      = this.state;

        let contributorNodes = contributors.map(contributor => {
            return <RepositoryContributorStat key={contributor.author.id} contributor={contributor} />;
        });

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> contributors
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {this.state.contributors.length}
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {contributorNodes}
                </div>
            </div>
        );
    }
}

RepositoryContributorsStats.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(RepositoryContributorsStats.prototype, ListenerMixin);
reactMixin(RepositoryContributorsStats.prototype, Mozaik.Mixin.ApiConsumer);

export { RepositoryContributorsStats as default };
