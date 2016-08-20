import test         from 'ava'
import React        from 'react'
import { shallow }  from 'enzyme'
import moment       from 'moment'
import TopCommitter from './../../src/components/TopCommitter'


const sampleRepository = 'plouc/mozaik'

test('should return correct api request', t => {
    let since = moment().startOf('day').format()
    let until = moment().endOf('day').format()

    t.deepEqual(TopCommitter.getApiRequest({
        repository: sampleRepository,
    }), {
        id:     `github.repositoryCommits.${sampleRepository}.${since}.${until}`,
        params: {
            repository: sampleRepository,
            since, until
        }
    })
})

test('header should display repository name by default', t => {
    const wrapper = shallow(<TopCommitter repository={sampleRepository} />)

    t.regex(wrapper.find('.widget__header').text(), new RegExp(sampleRepository))
})

test('header should allow title override', t => {
    const title   = 'custom title'
    const wrapper = shallow(<TopCommitter repository={sampleRepository} title={title} />)

    t.regex(wrapper.find('.widget__header').text(), new RegExp(title))
})

test('should display top committer info and commit count', t => {
    const topCommitter = {
        login:      'plouc',
        avatar_url: 'http://avatar.io/plouc',
    }
    const wrapper = shallow(
        <TopCommitter
            repository={sampleRepository}
            apiData={topCommitter}
        />
    )

    /*
    let img = TestUtils.scryRenderedDOMComponentsWithTag(topCommitter, 'img')
    expect(img).to.have.length(1)
    img = img[0]
    expect(img.props).to.have.property('src')
    expect(img.props.src).to.equal('http://avatar.io/plouc')

    let username = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'github__top-committer__info')
    expect(username.getDOMNode().textContent).to.contain('plouc')
    */
})
