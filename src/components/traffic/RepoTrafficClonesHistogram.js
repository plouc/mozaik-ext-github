import React, { Component } from 'react'
import RepoTrafficClones from './RepoTrafficClones'

export default class RepoTrafficClonesHistogram extends Component {
    static getApiRequest(params) {
        return RepoTrafficClones.getApiRequest(params)
    }

    render() {
        return <RepoTrafficClones {...this.props} type="histogram" />
    }
}
