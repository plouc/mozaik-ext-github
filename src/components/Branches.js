import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BranchesIcon from 'react-icons/lib/fa/code-fork'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from '@mozaik/ui'
import Branch, { BranchPropType } from './Branch'

export default class Branches extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            branches: PropTypes.arrayOf(BranchPropType).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.branches.${repository}`,
            params: { repository },
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
                    {apiData.branches.map(branch =>
                        <Branch key={branch.name} branch={branch} />
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Branches'}
                    subject={title ? null : repository}
                    count={count}
                    icon={BranchesIcon}
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
