import React           from 'react';
import Reflux          from 'reflux';
import { Mixin }       from 'mozaik/browser';
import StatusIcon      from './StatusIcon.jsx';
import StatusTimestamp from './StatusTimestamp.jsx';


export default React.createClass({
    displayName: 'Status',

    mixins: [
        Reflux.ListenerMixin,
        Mixin.ApiConsumer
    ],

    getInitialState() {
        return {
            status: null
        };
    },

    getApiRequest() {
        return {
            id: 'github.status'
        };
    },

    onApiData(status) {
        this.setState({
            status: status
        });
    },

    render() {
        var widgetBodyNode = (<div className="widget__body" />);

        if (this.state.status) {
            var messageNode = null;

            if (this.state.status.status !== 'good') {
                messageNode = (<span className="github__status__current__message">{ this.state.status.body }</span>);
            }

            widgetBodyNode = (
                <div className="widget__body">
                    <div className="github__status__current">
                        <StatusIcon status={ this.state.status.status } message={ this.state.status.body } />
                        { messageNode }
                        <StatusTimestamp timestamp={ this.state.status.created_on } />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    Github <span className="widget__header__subject">Status</span>
                    <i className="fa fa-github-alt" />
                </div>
                { widgetBodyNode }
            </div>
        );
    }
});
