import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import StatusIcon                      from './StatusIcon.jsx';
import StatusTimestamp                 from './StatusTimestamp.jsx';


class Status extends Component {
    constructor(props) {
        super(props);

        this.state = { status: null };
    }

    getApiRequest() {
        return { id: 'github.status' };
    }

    onApiData(status) {
        this.setState({ status });
    }

    render() {
        const { status } = this.state;

        let content = null;
        if (status) {
            let messageNode = null;

            if (status.status !== 'good') {
                messageNode = (
                    <span className="github__status__current__message">
                        {status.body}
                    </span>
                );
            }

            content = (
                <div className="github__status__current">
                    <StatusIcon status={status.status} message={status.body} />
                    {messageNode}
                    <StatusTimestamp timestamp={status.created_on} />
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    Github <span className="widget__header__subject">Stakljkjltus</span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {content}
                </div>
            </div>
        );
    }
}

Status.displayName = 'Status';

reactMixin(Status.prototype, ListenerMixin);
reactMixin(Status.prototype, Mozaik.Mixin.ApiConsumer);


export default Status;
