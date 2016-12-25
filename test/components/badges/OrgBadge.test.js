import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import OrgBadge    from './../../../src/components/badges/OrgBadge'
import {
    WidgetHeader,
    WidgetLoader,
} from 'mozaik/ui'


const sampleOrganization = 'github'

test('should return correct api request', t => {
    t.deepEqual(OrgBadge.getApiRequest({
        organization: sampleOrganization,
    }), {
        id:     `github.organization.${sampleOrganization}`,
        params: { organization: sampleOrganization }
    })
})

test('should display loader if no apiData available', t => {
    const wrapper = shallow(<OrgBadge organization={sampleOrganization} />)

    t.is(wrapper.find(WidgetLoader).length, 1)
})

test('should be able to display organization name without api response', t => {
    const wrapper = shallow(<OrgBadge organization={sampleOrganization} />)

    t.is(wrapper.find(WidgetHeader).prop('subject'), sampleOrganization)
})

test('should allow title override', t => {
    const wrapper = shallow(
        <OrgBadge
            organization={sampleOrganization}
            title="override"
        />
    )

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), 'override')
    t.is(header.prop('subject'), null)
})
