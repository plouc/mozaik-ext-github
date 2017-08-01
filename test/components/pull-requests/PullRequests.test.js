import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetHeader, WidgetLoader, defaultTheme } from '@mozaik/ui'
import PullRequests from './../../../src/components/pull-requests/PullRequests'

const sampleRepository = 'plouc/mozaik'
const samplePullRequests = [
    {
        id: 0,
        title: 'PR-0',
        html_url: 'https://github.com/whatever',
        created_at: '2011-10-10T14:48:00',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif',
            html_url: 'https://github.com/whatever',
            login: 'plouc',
        },
    },
    {
        id: 1,
        title: 'PR-1',
        html_url: 'https://github.com/whatever',
        created_at: '2011-10-10T14:48:00',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif',
            html_url: 'https://github.com/whatever',
            login: 'john',
        },
    },
    {
        id: 2,
        title: 'PR-2',
        html_url: 'https://github.com/whatever',
        created_at: '2011-10-10T14:48:00',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif',
            html_url: 'https://github.com/whatever',
            login: 'sarah',
        },
    },
]

test('should return correct api request', () => {
    expect(
        PullRequests.getApiRequest({
            repository: sampleRepository,
        })
    ).toEqual({
        id: `github.pullRequests.${sampleRepository}`,
        params: { repository: sampleRepository },
    })
})

test('should display loader if no apiData available', () => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

test('header should display 0 count by default', () => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('count')).toBe(0)
})

test('header should display pull request count when api sent data', () => {
    const wrapper = shallow(
        <PullRequests
            repository={sampleRepository}
            apiData={{ pullRequests: samplePullRequests }}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('count')).toBe(samplePullRequests.length)
})

test(`header title should default to '<repository_name> Pull Requests'`, () => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('title')).toBe('Pull Requests')
    expect(header.prop('subject')).toBe(sampleRepository)
})

test(`header title should be overridden when passing 'title' prop`, () => {
    const customTitle = 'Custom Title'
    const wrapper = shallow(<PullRequests repository={sampleRepository} title={customTitle} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('title')).toBe(customTitle)
    expect(header.prop('subject')).toBe(null)
})

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <PullRequests
                repository={sampleRepository}
                apiData={{ pullRequests: samplePullRequests }}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
