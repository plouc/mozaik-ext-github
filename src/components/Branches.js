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
import Branch, { BranchPropType }      from './Branch'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


class Branches extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.branches.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData: branches, apiError } = this.props

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> branches
            </span>
        ) : title

        return (
            <div>
                <WidgetHeader
                    title="branches"
                    subject={repository}
                    count={branches.length}
                    icon="code-fork"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <div>
                            {branches.map(branch => (
                                <Branch key={branch.name} branch={branch}/>
                            ))}
                        </div>
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}

Branches.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.arrayOf(BranchPropType),
    apiError:   PropTypes.object,
}

Branches.defaultProps = {
    apiData: [],
}


export default Branches
