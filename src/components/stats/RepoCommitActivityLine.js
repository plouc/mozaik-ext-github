import React, { Component } from 'react'
import RepoCommitActivity from './RepoCommitActivity'

export default class RepoCommitActivityLine extends Component {
    static getApiRequest(params) {
        return RepoCommitActivity.getApiRequest(params)
    }

    render() {
        return <RepoCommitActivity {...this.props} type="line" />
    }
}
