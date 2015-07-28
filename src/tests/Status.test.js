import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var Status;
var status;

describe('Github — Status', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        Status = require('./../components/Status.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        status = TestUtils.renderIntoDocument(<Status />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', function () {
        expect(status.getApiRequest()).to.eql({
            id: 'github.status'
        });
    });

    describe('having no status', () => {
        it('should show an empty widget body', function() {
            let widgetBody = TestUtils.findRenderedDOMComponentWithClass(status, 'widget__body');
            expect(widgetBody.innerHTML).to.not.exist;
        });
    });

    describe('having a "good" status message', () => {
        beforeEach(function() {
            status.setState({
                status: {
                    status:     'good',
                    body:       'everythings good',
                    created_on: new Date().toISOString()
                }
            });
        });

        it('should display status icon', () => {
            var icon = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__icon');
            expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-check-square"');
        });

        it('should display a from-now timestamp', () => {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__date');
            expect(timestamp.getDOMNode().textContent).to.equal('a few seconds ago');
        });
    });

    describe('having a "bad" status message', () => {
        beforeEach(() => {
            status.setState({
                status: {
                    status:     'minor',
                    body:       'oh noes!',
                    created_on: new Date().toISOString()
                }
            });
        });

        it('should display status icon', () => {
            var icon = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__icon');
            expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-warning"');
        });

        it('should display a message', () => {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__message');
            expect(timestamp.getDOMNode().textContent).to.equal('oh noes!');
        });

        it('should display a from-now timestamp', () => {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__date');
            expect(timestamp.getDOMNode().textContent).to.equal('a few seconds ago');
        });
    });
});