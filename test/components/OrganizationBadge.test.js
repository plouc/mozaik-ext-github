import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import OrganizationBadge from './../../src/components/OrganizationBadge'


const sampleOrganization = 'github'

test('should return correct api request', t => {
    t.deepEqual(OrganizationBadge.getApiRequest({
        organization: sampleOrganization,
    }), {
        id:     `github.organization.${sampleOrganization}`,
        params: { organization: sampleOrganization }
    })
})


test('should be able to display organization name without api response', t => {
    const wrapper = shallow(<OrganizationBadge organization={sampleOrganization} />)

    t.is(wrapper.find('.widget__header').text(), `${sampleOrganization}`)
})
