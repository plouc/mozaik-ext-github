import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import RepositoryContributorStat       from './RepositoryContributorStat.jsx';
import Mozaik                          from 'mozaik/browser';


class RepositoryContributorsStats extends Component {
    constructor(props) {
        super(props);

        this.state = { contributors: [] };
    }

    getApiRequest() {
        const { repository } = this.props;

        return {
            id:     `github.repositoryContributorsStats.${ repository }`,
            params: { repository }
        };
    }

    onApiData(contributors) {
        contributors.sort((contribA, contribB) => (contribB.total - contribA.total));

        this.setState({ contributors });
    }

    render() {
        const { repository, title } = this.props;
        const { contributors }      = this.state;

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> contributors
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {contributors.length}
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {contributors.map(contributor => (
                        <RepositoryContributorStat
                            key={contributor.author.id}
                            contributor={contributor}
                        />
                    ))}
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


export default RepositoryContributorsStats;
