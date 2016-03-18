import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var OrganizationBadge;
var organizationBadge;

describe('Github — OrganizationBadge', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        OrganizationBadge = require('./../components/OrganizationBadge.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        organizationBadge = TestUtils.renderIntoDocument(<OrganizationBadge organization="github" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });

    it('should return correct api request', () => {
        expect(organizationBadge.getApiRequest()).to.eql({
            id:     'github.organization.github',
            params: {
                organization: 'github'
            }
        });
    });

    it('should display organization name', () => {
        let organizationname = TestUtils.findRenderedDOMComponentWithClass(organizationBadge, 'widget__header');
        expect(organizationname.getDOMNode().textContent).to.equal('github');
    });
});