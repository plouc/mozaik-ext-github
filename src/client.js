var request = require('superagent-bluebird-promise');
var Promise = require('bluebird');
var _       = require('lodash');
var chalk   = require('chalk');
var config  = require('./config');


/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest(path, params) {
        let url = config.get('github.baseUrl');
        let req = request.get(url + path);

        mozaik.logger.info(chalk.yellow(`[github] calling ${ url + path }`));

        if (params) {
            req.query(params);
        }

        if (config.get('github.token') !== '') {
            req.set('Authorization', `token ${ config.get('github.token') }`);
        }

        return req.promise();
    }

    const apiCalls = {
        user(params) {
            return buildApiRequest(`/users/${ params.user }`)
                .then(res => res.body)
            ;
        },

        pullRequests(params) {
            return buildApiRequest(`/repos/${ params.repository }/pulls`)
                .then(res => res.body)
            ;
        },

        // Be warned that this API call can be heavy enough
        // because it loads each branch details with an extra call
        branches(params) {
            return buildApiRequest(`/repos/${ params.repository }/branches`)
                .then(res => {
                    return Promise.all(res.body.map(branch => {
                        return apiCalls.branch(_.extend({ branch: branch.name }, params));
                    }));
                })
            ;
        },

        branch(params) {
            return buildApiRequest(`/repos/${ params.repository }/branches/${ params.branch }`)
                .then(res => res.body)
            ;
        },

        repositoryContributorsStats(params) {
            return buildApiRequest(`/repos/${ params.repository }/stats/contributors`)
                .then(res => res.body)
            ;
        },

        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations(params) {
            params.labels.forEach(label => {
                label.count = 0;
            });

            return Promise.all(params.labels.map(function (label) {
                return buildApiRequest(`/repos/${ params.repository }/issues`, {
                    labels: label.name,
                    state:  'open',
                    filter: 'all'
                })
                    .then(res => {
                        label.count = res.body.length;

                        return label;
                    })
                ;
            }));
        },

        status() {
            const url = 'https://status.github.com/api/last-message.json';
            let req   = request.get(url);

            mozaik.logger.info(chalk.yellow(`[github] calling ${ url }`));

            return req.promise()
                .then(res => res.body)
            ;
        }
    };

    return apiCalls;
};

export { client as default };