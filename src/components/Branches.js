import React, { Component, PropTypes } from 'react'
import { TrapApiError }                from 'mozaik/ui'
import Branch, { BranchPropType }      from './Branch'


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
                <div className="widget__header">
                    <span>
                        {titleNode}
                        <span className="widget__header__count">
                            {branches.length}
                        </span>
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    <TrapApiError error={apiError}>
                        <div>
                            {branches.map(branch => (
                                <Branch key={branch.name} branch={branch}/>
                            ))}
                        </div>
                    </TrapApiError>
                </div>
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
