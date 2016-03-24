import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const { Gauge }                        = Mozaik.Component;


class PullRequestsGauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullRequests: []
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.pullRequests.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(pullRequests) {
        this.setState({
            pullRequests: pullRequests
        });
    }

    render() {
        let { repository, thresholds, title } = this.props;
        let { pullRequests }                  = this.state;

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> pull requests
            </span>
        ) : title;

        let cappedValue    = Math.min(pullRequests.length, _.max(_.pluck(thresholds, 'threshold')));
        let message        = null;
        let normThresholds = thresholds.map(threshold => {
            if (message === null && cappedValue <= threshold.threshold) {
                message = threshold.message;
            }

            return {
                upperBound: threshold.threshold,
                color:      threshold.color
            };
        });

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {pullRequests.length}
                    </span>
                    <i className="fa fa-github-alt"/>
                </div>
                <div className="widget__body">
                    <div className="github__pull-requests_gauge_chart">
                        <Gauge ranges={normThresholds} value={pullRequests.length}/>
                    </div>
                    <div className="github__pull-requests_gauge_message">
                        {message}
                    </div>
                </div>
            </div>
        );
    }
}

PullRequestsGauge.propTypes = {
    repository: PropTypes.string.isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.shape({
        threshold: PropTypes.number.isRequired,
        color:     PropTypes.string.isRequired,
        message:   PropTypes.string.isRequired
    })).isRequired
};

PullRequestsGauge.defaultProps = {
    thresholds: [
        { threshold: 3,  color: '#85e985', message: 'good job!' },
        { threshold: 5,  color: '#ecc265', message: 'you should consider reviewing' },
        { threshold: 10, color: '#f26a3f', message: 'pull requests overflow' }
    ]
};

reactMixin(PullRequestsGauge.prototype, ListenerMixin);
reactMixin(PullRequestsGauge.prototype, Mozaik.Mixin.ApiConsumer);


export { PullRequestsGauge as default };
