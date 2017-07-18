import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepoTrafficViews from './RepoTrafficViews'

export default class RepoTrafficViewsHistogram extends Component {
    static getApiRequest(params) {
        return RepoTrafficViews.getApiRequest(params)
    }

    render() {
        return <RepoTrafficViews {...this.props} type="histogram" />
    }
}
