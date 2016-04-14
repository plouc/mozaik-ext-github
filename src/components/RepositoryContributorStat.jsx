import React, { Component, PropTypes } from 'react';


class RepositoryContributorStat extends Component {
    render() {
        const { contributor: { author, total } } = this.props;

        return (
            <a href={author.html_url} target="_blank" className="list__item github__repository-contributors_stats__item">
                <img src={author.avatar_url}/>
                {author.login}&nbsp;
                <span className="github__repository-contributors_stats__item__count">
                    {total}&nbsp;<i className="fa fa-dot-circle-o"/>
                </span>
            </a>
        );
    }
}

RepositoryContributorStat.displayName = 'RepositoryContributorStat';

RepositoryContributorStat.propTypes = {
    contributor: PropTypes.shape({
        total:  PropTypes.number.isRequired,
        author: PropTypes.shape({
            login:      PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};


export default RepositoryContributorStat;
