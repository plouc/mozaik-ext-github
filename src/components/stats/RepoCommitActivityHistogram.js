import React, { Component } from 'react'
import RepoCommitActivity from './RepoCommitActivity'

export default class RepoCommitActivityHistogram extends Component {
    static getApiRequest(params) {
        return RepoCommitActivity.getApiRequest(params)
    }

    render() {
        return <RepoCommitActivity {...this.props} type="histogram" />
    }
}
