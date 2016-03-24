import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var PullRequests;
var pullRequests;

describe('Github — PullRequests', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        PullRequests = require('./../components/PullRequests.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        pullRequests = TestUtils.renderIntoDocument(<PullRequests repository="plouc/mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        expect(pullRequests.getApiRequest()).to.eql({
            id:     'github.pullRequests.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });

    it('should display 0 count by default', () => {
        let count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).to.equal('0');
    });

    it('will update with given array of pull requests', () => {
        pullRequests.setState({
            pullRequests: [
                {
                    id: 0,
                    title: 'PR-0',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 1,
                    title: 'PR-1',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 2,
                    title: 'PR-2',
                    user: {
                        avatar_url: 0
                    }
                }
            ]
        });

        let count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).to.equal('3');
    });

    it('renders default title "Pull Requests"', () => {
        let title = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header');
        expect(title.getDOMNode().textContent).to.contain('Pull Requests');
    });

    it('renders custom title when supplied', () => {
        pullRequests = TestUtils.renderIntoDocument(<PullRequests repository="plouc/mozaik" title="Custom Title" />)
        let title = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header');
        expect(title.getDOMNode().textContent).to.contain('Custom Title');
    });
});
