import React, { Component, PropTypes } from 'react'


class Branch extends Component {
    render() {
        const { branch } = this.props

        let authorAvatar = null
        let authorNode   = null

        if (branch.commit) {
            const { commit } = branch

            if (commit.author) {
                authorAvatar = (
                    <a href={commit.author.html_url} target="_blank" className="github__branch__avatar">
                        <img src={commit.author.avatar_url} />
                    </a>
                )

                authorNode = (
                    <span>
                        by <a href={commit.author.html_url} target="_blank">{commit.author.login}</a>
                    </span>
                )
            }
        }

        return (
            <div className="list__item github__branch">
                {authorAvatar}
                <a href={branch._links.html} target="_blank">{branch.name}</a>&nbsp;
                {authorNode}
            </div>
        )
    }
}

export const BranchPropType = PropTypes.shape({
    name:   PropTypes.string.isRequired,
    _links: PropTypes.shape({
        html: PropTypes.string.isRequired,
    }).isRequired,
    commit: PropTypes.shape({
        author: PropTypes.shape({
            login:      PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            html_url:   PropTypes.string.isRequired,
        })
    }),
})

Branch.propTypes = {
    branch: BranchPropType.isRequired,
}


export default Branch
