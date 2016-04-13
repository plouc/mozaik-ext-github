import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const  { Pie }                         = Mozaik.Component;


class IssueLabelsDonut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total:  0,
            labels: []
        };
    }

    getApiRequest() {
        const { repository } = this.props;

        return {
            id:     `github.issues.${ repository }`,
            params: { repository }
        };
    }

    onApiData(issues) {
        var labels = {};
        issues.forEach(issue => {
            issue.labels.forEach(label => {
                if (!labels[label.url]) {
                    labels[label.url] = label;
                    labels[label.url].count = 0;
                }
                labels[label.url].count++;
            });
        });

        this.setState({
            labels: labels,
            total:  issues.length
        });
    }

    render() {
        let { labels, total }     = this.state;
        let { title, repository } = this.props;

        let flatLabels = _.values(labels);
        let data       = flatLabels.map(label => {
            label.color = `#${ label.color }`;
            label.id    = label.name;
            label.label = label.name;

            return label;
        });

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> issue labels
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Pie data={data} count={total} countLabel={total > 1 ? 'issues' : 'issue'} innerRadius={0.7}/>
                </div>
            </div>
        );
    }
}

IssueLabelsDonut.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(IssueLabelsDonut.prototype, ListenerMixin);
reactMixin(IssueLabelsDonut.prototype, Mozaik.Mixin.ApiConsumer);


export default IssueLabelsDonut;
