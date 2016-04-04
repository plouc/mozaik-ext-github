import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import mockery     from 'mockery';


const sampleOrganization = 'github';
let OrganizationBadge;


test.before('before hook', t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    OrganizationBadge = require('./../../src/components/OrganizationBadge.jsx').default;
});


test.after('after hook', () => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<OrganizationBadge organization={sampleOrganization} />);

    t.same(wrapper.instance().getApiRequest(), {
        id:     `github.organization.${sampleOrganization}`,
        params: { organization: sampleOrganization }
    });
});


test('should be able to display organization name without api response', t => {
    const wrapper = shallow(<OrganizationBadge organization={sampleOrganization} />);

    t.is(wrapper.find('.widget__header').text(), `${sampleOrganization}`);
});
