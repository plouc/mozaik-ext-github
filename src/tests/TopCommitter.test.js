import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';
import moment       from 'moment';

var TopCommitter;
var topCommitter;

describe('Github — TopCommitter', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        TopCommitter = require('./../components/TopCommitter.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        topCommitter = TestUtils.renderIntoDocument(<TopCommitter repository="plouc/mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        let since = moment().startOf('day').format();
        let until = moment().endOf('day').format();

        expect(topCommitter.getApiRequest()).to.eql({
            id:     `github.repositoryCommits.plouc/mozaik.${ since }.${ until }`,
            params: {
                repository: 'plouc/mozaik',
                since:      since,
                until:      until
            }
        });
    });

    describe('header', () => {
        it('should display repository name by default', () => {
            let header = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'widget__header');
            expect(header.getDOMNode().textContent).to.contain('plouc/mozaik');
        });

        it('should allow title override', () => {
            topCommitter = TestUtils.renderIntoDocument(<TopCommitter repository="plouc/mozaik" title="custom title"/>);

            let title = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'widget__header');
            expect(title.getDOMNode().textContent).to.contain('custom title');
        });
    });

    it('should display top committer info and commit count', () => {
        topCommitter.setState({
            topCommitter: {
                login:      'plouc',
                avatar_url: 'http://avatar.io/plouc'
            }
        });

        let img = TestUtils.scryRenderedDOMComponentsWithTag(topCommitter, 'img');
        expect(img).to.have.length(1);
        img = img[0];
        expect(img.props).to.have.property('src');
        expect(img.props.src).to.equal('http://avatar.io/plouc');

        let username = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'github__top-committer__info');
        expect(username.getDOMNode().textContent).to.contain('plouc');
    });
});
