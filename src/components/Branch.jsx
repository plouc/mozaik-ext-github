import React, { PropTypes } from 'react';


const Branch = ({ branch }) => {
    let authorAvatar = null;
    let authorNode   = null;

    if (branch.commit) {
        const { commit } = branch;

        if (commit.author) {
            authorAvatar = (
                <div className="github__branch__avatar">
                    <img src={commit.author.avatar_url} />
                </div>
            );

            authorNode = <span>by {commit.author.login}</span>;
        }
    }

    return (
        <div className="list__item github__branch">
            {authorAvatar}
            {branch.name}&nbsp;
            {authorNode}
        </div>
    );
};

Branch.displayName = 'Branch';

Branch.propTypes = {
    branch: PropTypes.object.isRequired
};


export default Branch;
