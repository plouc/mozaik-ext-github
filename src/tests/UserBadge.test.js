import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var UserBadge;
var userBadge;

describe('Github — UserBadge', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        UserBadge = require('./../components/UserBadge.jsx');
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        userBadge = TestUtils.renderIntoDocument(<UserBadge user="plouc" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });

    it('should return correct api request', () => {
        expect(userBadge.getApiRequest()).to.eql({
            id:     'github.user.plouc',
            params: {
                user: 'plouc'
            }
        });
    });

    it('should display user name', () => {
        let username = TestUtils.findRenderedDOMComponentWithClass(userBadge, 'widget__header');
        expect(username.getDOMNode().textContent).to.equal('plouc github user');
    });
});