/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import RepoCommitActivity   from './RepoCommitActivity'


export default class RepoCommitActivityHistogram extends Component {
    static getApiRequest(params) {
        return RepoCommitActivity.getApiRequest(params)
    }

    render() {
        return <RepoCommitActivity {...this.props} type="histogram"/>
    }
}
