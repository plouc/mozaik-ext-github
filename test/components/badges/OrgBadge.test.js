import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetHeader, WidgetLoader, defaultTheme } from '@mozaik/ui'
import OrgBadge from './../../../src/components/badges/OrgBadge'

const sampleOrganization = 'github'

test('should return correct api request', () => {
    expect(
        OrgBadge.getApiRequest({
            organization: sampleOrganization,
        })
    ).toEqual({
        id: `github.organization.${sampleOrganization}`,
        params: { organization: sampleOrganization },
    })
})

test('should display loader if no apiData available', () => {
    const wrapper = shallow(<OrgBadge organization={sampleOrganization} />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

test('should be able to display organization name without api response', () => {
    const wrapper = shallow(<OrgBadge organization={sampleOrganization} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('subject')).toBe(sampleOrganization)
})

test('should allow title override', () => {
    const wrapper = shallow(<OrgBadge organization={sampleOrganization} title="override" />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('title')).toBe('override')
    expect(header.prop('subject')).toBe(null)
})

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <OrgBadge organization={sampleOrganization} />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
