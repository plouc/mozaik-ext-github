jest.dontMock('./../components/Status.jsx');

jest.setMock('mozaik/browser', {
    Mixin: { ApiConsumer: null }
});

var React, TestUtils, Status, status;

describe('Github — Status', function () {

    beforeEach(function () {
        React        = require('react/addons');
        TestUtils    = React.addons.TestUtils;
        Status       = require('./../components/Status.jsx');
        status       = TestUtils.renderIntoDocument(<Status />);
    });

    it('should return correct api request', function () {
        expect(status.getApiRequest()).toEqual({
            id: 'github.status',
        });
    });

    describe('having no status', function() {
        it('should show an empty widget body', function() {
            var widgetBody = TestUtils.findRenderedDOMComponentWithClass(status, 'widget__body');
            expect(widgetBody.innerHTML).toBeUndefined();
        });
    });

    describe('having a "good" status message', function() {
        beforeEach(function() {
            status.setState({
                status: {
                    status: 'good',
                    body: 'everythings good',
                    created_on: new Date().toISOString()
                }
            });
        })

        it('should display status icon', function () {
            var icon = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__icon');
            expect(icon.getDOMNode().innerHTML).toMatch('class="fa fa-check-square"');
        });

        it('should display a from-now timestamp', function() {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__date');
            expect(timestamp.getDOMNode().textContent).toEqual('a few seconds ago');
        });
    });

    describe('having a "bad" status message', function() {
        beforeEach(function() {
            status.setState({
                status: {
                    status: 'minor',
                    body: 'oh noes!',
                    created_on: new Date().toISOString()
                }
            });
        })

        it('should display status icon', function () {
            var icon = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__icon');
            expect(icon.getDOMNode().innerHTML).toMatch('class="fa fa-warning"');
        });

        it('should display a message', function() {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__message');
            expect(timestamp.getDOMNode().textContent).toEqual('oh noes!');
        });

        it('should display a from-now timestamp', function() {
            var timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'github__status__current__date');
            expect(timestamp.getDOMNode().textContent).toEqual('a few seconds ago');
        });
    });
});