import test      from 'ava'
import nock      from 'nock'
import sinon     from 'sinon'
import mockery   from 'mockery'
import chalkMock from './chalk-mock'


const githubBaseUrl = 'https://github.test'
const githubToken   = 'secret_token'

test.before('before', t => {
    mockery.enable({
        warnOnUnregistered: false
    })

    mockery.registerMock('chalk', chalkMock)
    mockery.registerMock('./config', {
        get: (configKey) => {
            if (configKey === 'github.baseUrl') {
                return githubBaseUrl
            } else if (configKey === 'github.token') {
                return githubToken
            }

            throw new Error(`Invalid config key '${configKey}'`)
        }
    })
})

test.beforeEach('beforeEach', t => {
    const mozaik = {
        loadApiConfig: () => {},
        logger:        {
            info:  sinon.spy(),
            error: sinon.spy()
        }
    }

    t.context = {
        client: require('../src/client')(mozaik),
        mozaik
    }
})

test.after('after', t => {
    mockery.deregisterAll()
})


test('organization', t => {
    const { client, mozaik } = t.context

    const organization       = 'mozaik'
    const sampleOrganization = { organization }

    nock(githubBaseUrl)
        .get(`/orgs/${organization}`)
        .reply(200, sampleOrganization)
    

    return client.organization({ organization })
        .then(orgData => {
            t.deepEqual(orgData, sampleOrganization)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/orgs/${organization}`)
        })
    
})

test('user', t => {
    const { client, mozaik } = t.context

    const user       = 'plouc'
    const sampleUser = { user }

    nock(githubBaseUrl)
        .get(`/users/${user}`)
        .reply(200, sampleUser)


    return client.user({ user })
        .then(userData => {
            t.deepEqual(userData, sampleUser)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/users/${user}`)
        })

})

test('pullRequests', t => {
    const { client, mozaik } = t.context

    const repository         = 'mozaik'
    const samplePullRequests = [{ id: 0 }, { id: 1 }, { id: 2 }]

    nock(githubBaseUrl)
        .get(`/repos/${repository}/pulls`)
        .reply(200, samplePullRequests)


    return client.pullRequests({ repository })
        .then(pullRequestsData => {
            t.deepEqual(pullRequestsData, { pullRequests: samplePullRequests })
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/repos/${repository}/pulls`)
        })

})

test('branch', t => {
    const { client, mozaik } = t.context

    const repository   = 'mozaik'
    const branch       = 'master'
    const sampleBranch = { repository, branch }

    nock(githubBaseUrl)
        .get(`/repos/${repository}/branches/${branch}`)
        .reply(200, sampleBranch)


    return client.branch({ repository, branch })
        .then(branchData => {
            t.deepEqual(branchData, sampleBranch)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/repos/${repository}/branches/${branch}`)
        })

})

test('repositoryContributorsStats', t => {
    const { client, mozaik } = t.context

    const repository     = 'mozaik'
    const sampleContribs = [{ id: 0 }, { id: 1 }, { id: 2 }]

    nock(githubBaseUrl)
        .get(`/repos/${repository}/stats/contributors`)
        .reply(200, sampleContribs)


    return client.repositoryContributorsStats({ repository })
        .then(contribsData => {
            t.deepEqual(contribsData, { contributors: sampleContribs })
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/repos/${repository}/stats/contributors`)
        })

})

test('issues', t => {
    const { client, mozaik } = t.context

    const repository   = 'mozaik'
    const sampleIssues = [{ id: 0 }, { id: 1 }, { id: 2 }]

    nock(githubBaseUrl)
        .get(`/repos/${repository}/issues`)
        .reply(200, sampleIssues)


    return client.issues({ repository })
        .then(issuesData => {
            t.deepEqual(issuesData, sampleIssues)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/repos/${repository}/issues`)
        })

})

test('status', t => {
    const { client, mozaik } = t.context

    const statusUrl    = 'https://status.github.com/api/last-message.json'
    const sampleStatus = { status: 'ok' }

    nock('https://status.github.com')
        .get('/api/last-message.json')
        .reply(200, sampleStatus)


    return client.status()
        .then(statusData => {
            t.deepEqual(statusData, sampleStatus)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${statusUrl}`)
        })

})
