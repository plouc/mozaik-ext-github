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
import RepoTrafficClonesHistogramChart from './charts/RepoTrafficClonesHistogramChart'
import RepoTrafficClonesLineChart      from './charts/RepoTrafficClonesLineChart'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class RepoTrafficClones extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.any,
        apiError:   PropTypes.object,
        type:       PropTypes.oneOf(['histogram', 'line']).isRequired,
    }

    static defaultProps = {
        type: 'histogram',
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.trafficClones.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, type, apiData, apiError } = this.props

        let countNode = null
        let body      = <WidgetLoader />
        if (apiData !== undefined) {
            const { count, uniques, clones } = apiData

            countNode = (
                <span>
                    {count} clones - {uniques} unique clones
                </span>
            )

            if (type === 'histogram') {
                body = <RepoTrafficClonesHistogramChart clones={clones}/>
            } else if (type === 'line') {
                body = <RepoTrafficClonesLineChart clones={clones}/>
            }
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Clones'}
                    subject={title ? null : repository}
                    count={countNode}
                    icon="line-chart"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
