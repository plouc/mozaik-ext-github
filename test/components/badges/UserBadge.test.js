import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetHeader, WidgetLoader, defaultTheme } from '@mozaik/ui'
import UserBadge from './../../../src/components/badges/UserBadge'

const sampleUser = 'plouc'

test('should return correct api request', () => {
    expect(
        UserBadge.getApiRequest({
            user: sampleUser,
        })
    ).toEqual({
        id: `github.user.${sampleUser}`,
        params: { user: sampleUser },
    })
})

test('should display loader if no apiData available', () => {
    const wrapper = shallow(<UserBadge user={sampleUser} />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

test('should be able to display user name without api response', () => {
    const wrapper = shallow(<UserBadge user={sampleUser} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('subject')).toBe(sampleUser)
})

test('should allow title override', () => {
    const wrapper = shallow(<UserBadge user={sampleUser} title="override" />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('title')).toBe('override')
    expect(header.prop('subject')).toBe(null)
})

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <UserBadge
                user={sampleUser}
                apiData={{
                    avatar_url: 'http://mozaik.rocks/avatar.gif',
                    public_repos: 10,
                    public_gists: 11,
                    followers: 12,
                    following: 13,
                    company: 'ploucorp',
                }}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
