import React, { Component } from 'react'
import RepoTrafficClones from './RepoTrafficClones'

export default class RepoTrafficLineHistogram extends Component {
    static getApiRequest(params) {
        return RepoTrafficClones.getApiRequest(params)
    }

    render() {
        return <RepoTrafficClones {...this.props} type="line" />
    }
}
