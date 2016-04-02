import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var RepositoryBadge;
var repositoryBadge;

describe('Github — RepositoryBadge', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        RepositoryBadge = require('./../components/RepositoryBadge.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        repositoryBadge = TestUtils.renderIntoDocument(<RepositoryBadge repository="plouc/mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });

    it('should return correct api request', () => {
        expect(repositoryBadge.getApiRequest()).to.eql({
            id:     'github.repository.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });

    it('should display repository name', () => {
        let repositoryname = TestUtils.findRenderedDOMComponentWithClass(repositoryBadge, 'widget__header');
        expect(repositoryname.getDOMNode().textContent).to.equal('plouc/mozaik');
    });
});