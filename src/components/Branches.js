import React, { Component, PropTypes } from 'react'
import Branch, { BranchPropType }      from './Branch'


class Branches extends Component {
    static getApiRequest({ repository }) {
        return {
            id:     `github.branches.${repository}`,
            params: { repository }
        }
    }

    render() {
        const { repository, title, apiData: branches } = this.props

        const titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> branches
            </span>
        ) : title

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <span className="widget__header__count">
                        {branches.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {branches.map(branch => (
                        <Branch key={branch.name} branch={branch}/>
                    ))}
                </div>
            </div>
        )
    }
}

Branches.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string,
    apiData:    PropTypes.arrayOf(BranchPropType),
}

Branches.defaultProps = {
    apiData: [],
}


export default Branches
