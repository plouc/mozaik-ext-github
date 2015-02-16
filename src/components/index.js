var components = {
    Branches:                    require('./Branches.jsx'),
    PullRequests:                require('./PullRequests.jsx'),
    IssueLabelsTreemap:          require('./IssueLabelsTreemap.jsx'),
    UserBadge:                   require('./UserBadge.jsx'),
    RepositoryContributorsStats: require('./RepositoryContributorsStats.jsx')
};

require('mozaik/browser')
    .add('github.branches',                      components.Branches)
    .add('github.pull_requests',                 components.PullRequests)
    .add('github.issue_labels_treemap',          components.IssueLabelsTreemap)
    .add('github.user_badge',                    components.PullRequests)
    .add('github.repository_contributors_stats', components.RepositoryContributorsStats)
;

module.exports = components;