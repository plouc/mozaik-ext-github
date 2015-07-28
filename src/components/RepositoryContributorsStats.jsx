import React, { PropTypes }      from 'react';
import Reflux                    from 'reflux';
import _                         from 'lodash';
import RepositoryContributorStat from './RepositoryContributorStat.jsx';
import { Mixin }                 from 'mozaik/browser';


/**
 * @see https://github.com/plouc/mozaik/wiki/Github-Widgets#github-repository-contributors-stats
 */
export default React.createClass({
    displayName: 'RepositoryContributorsStats',

    mixins: [
        Reflux.ListenerMixin,
        Mixin.ApiConsumer
    ],

    propTypes: {
        repository: PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            contributors: []
        };
    },

    getApiRequest() {
        return {
            id: 'github.repositoryContributorsStats.' + this.props.repository,
            params: {
                repository: this.props.repository
            }
        };
    },

    onApiData(contributors) {
        contributors.sort((contribA, contribB) => {
            return contribB.total - contribA.total;
        });

        this.setState({
            contributors: contributors
        });
    },

    render() {
        var contributorNodes = _.map(this.state.contributors, contributor => {
            return <RepositoryContributorStat key={contributor.id} contributor={contributor} />;
        });

        return (
            <div>
                <div className="widget__header">
                    Contributors
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
});
