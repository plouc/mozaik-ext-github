import test         from 'ava'
import React        from 'react'
import { shallow }  from 'enzyme'
import PullRequests from './../../../src/components/pull-requests/PullRequests'
import {
    WidgetHeader,
    WidgetLoader,
} from 'mozaik/ui'


const sampleRepository   = 'plouc/mozaik'
const samplePullRequests = [
    {
        id:    0,
        title: 'PR-0',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id:    1,
        title: 'PR-1',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id:    2,
        title: 'PR-2',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    }
]

test('should return correct api request', t => {
    t.deepEqual(PullRequests.getApiRequest({
        repository: sampleRepository,
    }), {
        id:     `github.pullRequests.${sampleRepository}`,
        params: { repository: sampleRepository }
    })
})

test('should display loader if no apiData available', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository}/>)

    t.is(wrapper.find(WidgetLoader).length, 1)
})

/*
test('header should display 0 count by default', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository}/>)

    t.is(wrapper.find('.widget__header__count').text(), '0')
})
*/


test('header should display pull request count when api sent data', t => {
    const wrapper = shallow(
        <PullRequests
            repository={sampleRepository}
            apiData={{ pullRequests: samplePullRequests }}
        />
    )

    t.is(wrapper.find(WidgetHeader).prop('count'), samplePullRequests.length)
})

test('header title should default to \'<repository_name> Pull Requests\'', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />)

    t.is(wrapper.find(WidgetHeader).prop('title'), 'Pull Requests')
    t.is(wrapper.find(WidgetHeader).prop('subject'), sampleRepository)
})

test('header title should be overridden when passing \'title\' prop', t => {
    const customTitle = 'Custom Title'
    const wrapper     = shallow(
        <PullRequests
            repository={sampleRepository}
            title={customTitle}
        />
    )

    t.is(wrapper.find(WidgetHeader).prop('title'), customTitle)
    t.is(wrapper.find(WidgetHeader).prop('subject'), null)
})
