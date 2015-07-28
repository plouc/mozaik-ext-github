import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Branch                          from './Branch.jsx';
import Mozaik                          from 'mozaik/browser';


class Branches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: []
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.branches.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(branches) {
        this.setState({
            branches: branches
        });
    }

    render() {
        let { branches } = this.state;

        console.log(branches);

        let title = (
            <span>
                <span className="widget__header__subject">{this.props.repository}</span>&nbsp;branches
            </span>
        );

        return (
            <div>
                <div className="widget__header">
                    { this.props.title ? this.props.title : title }
                    <span className="widget__header__count">
                        {branches.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {branches.map(branch => {
                        return <Branch key={branch.name} branch={branch}/>;
                    })}
                </div>
            </div>
        );
    }
}

Branches.propTypes = {
    repository: PropTypes.string.isRequired
};

reactMixin(Branches.prototype, ListenerMixin);
reactMixin(Branches.prototype, Mozaik.Mixin.ApiConsumer);

export { Branches as default };
