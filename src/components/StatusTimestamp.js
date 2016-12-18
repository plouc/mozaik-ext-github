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
import moment                          from 'moment'


class StatusTimestamp extends Component {
    render() {
        const { timestamp } = this.props

        return (
            <span className="github__status__current__date">
                {moment(timestamp).fromNow()}
            </span>
        )
    }
}

StatusTimestamp.propTypes = {
    timestamp: PropTypes.string.isRequired,
}


export default StatusTimestamp
