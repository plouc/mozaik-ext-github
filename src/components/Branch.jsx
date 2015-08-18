import React, { Component } from 'react';


class Branch extends Component {
    render() {
        let { branch } = this.props;

        let authorAvatar = null;
        let authorNode   = null;

        if (branch.commit) {
            if (branch.commit.author) {
                authorAvatar = (
                    <div className="github__branch__avatar">
                        <img src={branch.commit.author.avatar_url} />
                    </div>
                );

                authorNode = <span>by {branch.commit.author.login}</span>
            }
        }

        return (
            <div className="list__item github__branch">
                {authorAvatar}
                {branch.name}&nbsp;
                {authorNode}
            </div>
        );
    }
}

export { Branch as default };
