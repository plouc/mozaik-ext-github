/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import RepoTrafficViews                from './RepoTrafficViews'


export default class RepoTrafficViewsHistogram extends Component {
    static getApiRequest(params) {
        return RepoTrafficViews.getApiRequest(params)
    }

    render() {
        return <RepoTrafficViews {...this.props} type="histogram"/>
    }
}
