/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import RepoTrafficClones    from './RepoTrafficClones'


export default class RepoTrafficLineHistogram extends Component {
    static getApiRequest(params) {
        return RepoTrafficClones.getApiRequest(params)
    }

    render() {
        return <RepoTrafficClones {...this.props} type="line"/>
    }
}
