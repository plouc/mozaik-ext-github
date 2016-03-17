/**
 * Mozaïk github widgets sample config.
 *
 * A showcase of all available widgets from mozaik-ext-github extension.
 * https://github.com/plouc/mozaik-ext-github
 */
require('dotenv').load();


var githubUser       = 'plouc';
var githubRepository = 'mozaik';


var config = {
    env:  'prod',

    host: '0.0.0.0',
    port: process.env.PORT || 5000,

    theme: 'snow',

    api: {},

    rotationDuration: 10000,

    dashboards: [
        {
            columns: 3,
            rows:    3,
            widgets: [
                {
                    type: 'github.user_badge',
                    user: githubUser,
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'github.repository_contributors_stats',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'github.status',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'github.branches',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'github.pull_requests',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'github.issue_labels_donut',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 2, y: 1
                },
                {
                    type: 'github.issue_labels_treemap',
                    repository: githubRepository,
                    labels: [
                        { color: '#6bc2c8', count: 13, name: 'blocker'     },
                        { color: '#5f8cc0', count: 3,  name: 'enhancement' },
                        { color: '#525487', count: 7,  name: 'bug'         },
                        { color: '#383b72', count: 16, name: 'help-wanted' }
                    ],
                    columns: 1, rows: 1,
                    x: 0, y: 2
                },
                {
                    type: 'github.pull_requests_gauge',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 1, y: 2
                },
                {
                    type: 'github.top_committer',
                    repository: githubRepository,
                    columns: 1, rows: 1,
                    x: 2, y: 2
                }
            ]
        }
    ]
};


module.exports = config;
