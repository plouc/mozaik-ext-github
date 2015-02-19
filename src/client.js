var request = require('superagent');
var Promise = require('bluebird');
var _       = require('lodash');
var chalk   = require('chalk');
var config  = require('./config');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
var client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest(path, params) {
        var url = config.get('github.baseUrl');
        var req = request.get(url + path);

        mozaik.logger.info(chalk.yellow(`[github] calling ${ url + path }`));

        if (params) {
            req.query(params);
        }

        if (config.get('github.token') !== '') {
            req.set('Authorization', 'token ' + config.get('github.token'));
        }

        return req.promise();
    }

    return {
        user(params) {
            return buildApiRequest('/users/' + params.user)
                .then(function (res) {
                    return res.body;
                })
            ;
        },

        pullRequests(params) {
            return buildApiRequest('/repos/' + params.repository + '/pulls')
                .then(function (res) {
                    return res.body;
                })
            ;
        },

        // Be warned that this API call can be heavy enough
        // because it loads each branch details with an extra call
        branches(params) {
            return buildApiRequest('/repos/' + params.repository + '/branches')
                .then(function (res) {
                    return Promise.all(res.body.map(function (branch) {
                        return module.exports.branch(_.extend({ branch: branch.name }, params));
                    }));
                })
            ;
        },
        branch: function (params) {
            return buildApiRequest('/repos/' + params.repository + '/branches/' + params.branch)
                .then(function (res) {
                    return res.body;
                })
            ;
        },

        repositoryContributorsStats(params) {
            return buildApiRequest('/repos/' + params.repository + '/stats/contributors')
                .then(function (res) {
                    return res.body;
                })
            ;
        },

        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations(params) {
            params.labels.forEach(function (label) {
                label.count = 0;
            });

            return Promise.all(params.labels.map(function (label) {
                return buildApiRequest('/repos/' + params.repository + '/issues', {
                    labels: label.name,
                    state:  'open',
                    filter: 'all'
                })
                    .then(function (res) {
                        label.count = res.body.length;

                        return label;
                    })
                ;
            }));
        }
    };
};

module.exports = client;