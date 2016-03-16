import React, { PropTypes } from 'react';


const RepositoryContributorStat = ({ contributor: { author, total } }) => (
    <div className="list__item github__repository-contributors_stats__item">
        <img src={author.avatar_url} />
        {author.login}&nbsp;
        <span className="github__repository-contributors_stats__item__count">
            {total}&nbsp;<i className="fa fa-dot-circle-o" />
        </span>
    </div>
);

RepositoryContributorStat.displayName = 'RepositoryContributorStat';

RepositoryContributorStat.propTypes = {
    contributor: PropTypes.shape({
        author: PropTypes.shape({
            login:      PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired
        }).isRequired,
        total:  PropTypes.number.isRequired
    }).isRequired
};


export default RepositoryContributorStat;
