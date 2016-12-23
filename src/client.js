/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const request = require('superagent-bluebird-promise')
const _       = require('lodash')
const chalk   = require('chalk')
const config  = require('./config')


const previewAcceptHeader = 'application/vnd.github.spiderman-preview'


/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {

    mozaik.loadApiConfig(config)

    const buildApiRequest = (path, params) => {
        const url = config.get('github.baseUrl')
        const req = request.get(`${url}${path}`)

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(chalk.yellow(`[github] calling ${url}${path}${paramsDebug}`))

        if (params) {
            req.query(params)
        }

        req.set('Accept', previewAcceptHeader)

        if (config.get('github.token') !== '') {
            req.set('Authorization', `token ${config.get('github.token')}`)
        }

        return req.promise()
    }

    const repositoryCommits = (params, buffer) => {
        return buildApiRequest(`/repos/${params.repository}/commits`, params)
            .then(res => {
                buffer.commits = buffer.commits.concat(res.body)

                // checks if there's an available next page in response link http header
                if (res.headers.link && /&page=(\d+)> rel="next"/.test(res.headers.link) === true && buffer.commits.length < buffer.max) {
                    buffer.page = Number(/&page=(\d+)> rel="next"/.exec(res.headers.link)[1])

                    return repositoryCommits(params, buffer)
                } else {
                    return buffer.commits
                }
            })
        
    }

    const apiCalls = {
        organization({ organization }) {
            return buildApiRequest(`/orgs/${organization}`)
                .then(res => res.body)
            
        },

        user({ user }) {
            return buildApiRequest(`/users/${user}`)
                .then(res => res.body)
        },

        repository({ repository }) {
            return buildApiRequest(`/repos/${repository}`)
                .then(res => res.body)
        },

        pullRequests({ repository }) {
            return buildApiRequest(`/repos/${repository}/pulls`)
                .then(res => ({ pullRequests: res.body }))
        },

        repositoryParticipationStats({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/participation`)
                .then(res => res.body)
            
        },

        repositoryLanguages({ repository }) {
            return buildApiRequest(`/repos/${repository}/languages`)
                .then(res => res.body)
            
        },

        // Be warned that this API call can be heavy enough
        // because it loads each branch details with an extra call
        branches(params) {
            return buildApiRequest(`/repos/${params.repository}/branches`)
                .then(res => {
                    return Promise.all(res.body.map(branch => {
                        return apiCalls.branch(_.extend({ branch: branch.name }, params))
                    }))
                })
                .then(branches => ({ branches }))
            
        },

        branch({ repository, branch }) {
            return buildApiRequest(`/repos/${repository}/branches/${branch}`)
                .then(res => res.body)
            
        },

        repositoryContributorsStats({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/contributors`)
                .then(res => ({ contributors: res.body }))
        },

        repoCommitActivity({ repository }) {
            return buildApiRequest(`/repos/${repository}/stats/commit_activity`)
                .then(res => ({ buckets: res.body }))
        },

        repositoryCommits(params) {
            return repositoryCommits(params, {
                commits: [],
                page:    1,
                max:     1000
            })
                .then(commits => {
                    return commits
                })
        },

        issues({ repository }) {
            return buildApiRequest(`/repos/${repository}/issues`)
                .then(res => res.body)
        },

        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations(params) {
            params.labels.forEach(label => {
                label.count = 0
            })

            return Promise.all(params.labels.map(label => {
                return buildApiRequest(`/repos/${params.repository}/issues`, {
                    labels: label.name,
                    state:  'open',
                    filter: 'all'
                })
                    .then(res => {
                        console.log(res)

                        label.count = res.body.length

                        return label
                    })
                
            }))
        },

        status() {
            const url = 'https://status.github.com/api/last-message.json'
            let req   = request.get(url)

            mozaik.logger.info(chalk.yellow(`[github] calling ${url}`))

            return req.promise()
                .then(res => res.body)
            
        },

        trafficViews({ repository }) {
            return buildApiRequest(`/repos/${repository}/traffic/views`)
                .then(res => res.body)
        },

        trafficClones({ repository }) {
            return buildApiRequest(`/repos/${repository}/traffic/clones`)
                .then(res => res.body)
        },
    }

    return apiCalls
}


module.exports = client
