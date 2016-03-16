import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const  { Treemap }                     = Mozaik.Component;


class IssueLabelsTreemap extends Component {
    static displayName = 'IssueLabelsTreemap';

    static propTypes = {
        repository: PropTypes.string.isRequired,
        labels:     PropTypes.arrayOf(PropTypes.shape({
            name:  PropTypes.string,
            color: PropTypes.string
        })).isRequired
    };

    constructor(props) {
        super(props);

        this.state = { labels: [] };
    }

    getApiRequest() {
        let { labels, repository } = this.props;

        return {
            id:     `github.issueLabelsAggregations.${ _.pluck(labels, 'name').join('.') }`,
            params: { repository, labels }
        };
    }

    onApiData(labels) {
        this.setState({ labels });
    }

    render() {
        let { labels } = this.state;

        let data = labels.map(label => ({
            label: label.name,
            count: label.count,
            color: label.color
        }));

        return (
            <div>
                <div className="widget__header">
                    Github issues types
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Treemap data={{ children: data }} showCount={true} />
                </div>
            </div>
        );
    }
}

reactMixin(IssueLabelsTreemap.prototype, ListenerMixin);
reactMixin(IssueLabelsTreemap.prototype, Mozaik.Mixin.ApiConsumer);


export default IssueLabelsTreemap;
