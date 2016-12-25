/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, PropTypes } from 'react'
import Branch, { BranchPropType }      from './Branch'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class Branches extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiData:    PropTypes.shape({
            branches: PropTypes.arrayOf(BranchPropType).isRequired
        }),
        apiError:   PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id:     `github.branches.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let count
        if (apiData && !apiError) {
            count = apiData.branches.length
            body = (
                <div>
                    {apiData.branches.map(branch => (
                        <Branch key={branch.name} branch={branch}/>
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Branches'}
                    subject={title ? null : repository}
                    count={count}
                    icon="code-fork"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
