'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

// https://developer.github.com/v3/#user-agent-required
const userAgent = '@mozaik/ext-github'
const previewAcceptHeader = 'application/vnd.github.spiderman-preview'

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const buildApiRequest = (path, params) => {
        const url = config.get('github.baseUrl')

        const options = {
            uri: `${url}${path}`,
            qs: {},
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': userAgent,
                Accept: previewAcceptHeader,
            },
        }

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(chalk.yellow(`[github] calling ${url}${path}${paramsDebug}`))

        if (params) {
            options.qs = params
        }

        if (config.get('github.token') !== '') {
            options.headers.Authorization = `token ${config.get('github.token')}`
        }

        return request(options)
    }

    const repositoryCommits = (params, buffer) => {
        return buildApiRequest(`/repos/${params.repository}/commits`, params).then(res => {
            buffer.commits = buffer.commits.concat(res.body)

            // checks if there's an available next page in response link http header
            if (
                res.headers.link &&
                /&page=(\d+)> rel="next"/.test(res.headers.link) === true &&
                buffer.commits.length < buffer.max
            ) {
                buffer.page = Number(/&page=(\d+)> rel="next"/.exec(res.headers.link)[1])

                return repositoryCommits(params, buffer)
            } else {
                return buffer.commits
            }
        })
    }

    const apiCalls = {
        organization({ organization }) {
            return buildApiRequest(`/orgs/${organization}`).then(res => res.body)
        },

        user({ user }) {
            return buildApiRequest(`/users/${user}`).then(({ body }) => body)
        },

        repository({ repository }) {
            return buildApiRequest(`/repos/${repository}`).then(({ body }) => body)
        },

        pullRequests({ repository }) {
            return buildApiRequest(`/repos/${repository}/pulls`).then(({ body: pullRequests }) => ({
                pullRequests,
            }))
        },

        repositoryParticipationStats({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/participation`).then(
                ({ body }) => body
            )
        },

        repositoryLanguages({ repository }) {
            return buildApiRequest(`/repos/${repository}/languages`).then(({ body }) => body)
        },

        // Be warned that this API call can be heavy enough
        // because it loads each branch details with an extra call
        branches(params) {
            return buildApiRequest(`/repos/${params.repository}/branches`)
                .then(res => {
                    return Promise.all(
                        res.body.map(branch => {
                            return apiCalls.branch(Object.assign({ branch: branch.name }, params))
                        })
                    )
                })
                .then(branches => ({ branches }))
        },

        branch({ repository, branch }) {
            return buildApiRequest(`/repos/${repository}/branches/${branch}`).then(
                ({ body }) => body
            )
        },

        repositoryContributorsStats({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/contributors`).then(res => ({
                contributors: res.body,
            }))
        },

        repoCommitActivity({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/commit_activity`).then(res => ({
                buckets: res.body,
            }))
        },

        repositoryCommits(params) {
            return repositoryCommits(params, {
                commits: [],
                page: 1,
                max: 1000,
            })
        },

        issues({ repository }) {
            return buildApiRequest(`/repos/${repository}/issues`).then(({ body }) => body)
        },

        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations(params) {
            params.labels.forEach(label => {
                label.count = 0
            })

            return Promise.all(
                params.labels.map(label => {
                    return buildApiRequest(`/repos/${params.repository}/issues`, {
                        labels: label.name,
                        state: 'open',
                        filter: 'all',
                    }).then(res => {
                        label.count = res.body.length

                        return label
                    })
                })
            )
        },

        status() {
            const url = 'https://status.github.com/api/last-message.json'
            let req = request.get(url)

            mozaik.logger.info(chalk.yellow(`[github] calling ${url}`))

            return req.promise().then(res => res.body)
        },

        trafficViews({ repository }) {
            return buildApiRequest(`/repos/${repository}/traffic/views`).then(({ body }) => body)
        },

        trafficClones({ repository }) {
            return buildApiRequest(`/repos/${repository}/traffic/clones`).then(({ body }) => body)
        },
    }

    return apiCalls
}

module.exports = client
