import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import _       from 'lodash';
import chalk   from 'chalk';
import config  from './config';


/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest(path, params) {
        let url = config.get('github.baseUrl');
        let req = request.get(url + path);

        mozaik.logger.info(chalk.yellow(`[github] calling ${ url + path } ${ JSON.stringify(params) }`));

        if (params) {
            req.query(params);
        }

        if (config.get('github.token') !== '') {
            req.set('Authorization', `token ${ config.get('github.token') }`);
        }

        return req.promise();
    }

    function repositoryCommits(params, buffer) {
        return buildApiRequest(`/repos/${ params.repository }/commits`, params)
            .then(res => {
                buffer.commits = buffer.commits.concat(res.body);

                // checks if there's an available next page in response link http header
                if (res.headers.link && /&page=(\d+)>; rel="next"/.test(res.headers.link) === true && buffer.commits.length < buffer.max) {
                    buffer.page = parseInt(/&page=(\d+)>; rel="next"/.exec(res.headers.link)[1]);

                    return repositoryCommits(params, buffer);
                } else {
                    return buffer.commits;
                }
            })
        ;
    }

    const apiCalls = {
        organization(params) {
            return buildApiRequest(`/orgs/${ params.organization }`)
                .then(res => res.body)
            ;
        },

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

        repositoryCommits(params) {
            return repositoryCommits(params, {
                commits: [],
                page:    1,
                max:     1000
            })
                .then(commits => {
                    return commits;
                })
            ;
        },

        repository(params) {
            return buildApiRequest(`/repos/${ params.repository }`)
                .then(res => res.body)
            ;
        },

        issues(params) {
            return buildApiRequest(`/repos/${ params.repository }/issues`)
                .then(res => res.body)
            ;
        },

        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations(params) {
            params.labels.forEach(label => {
                label.count = 0;
            });

            return Promise.all(params.labels.map(label => {
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
