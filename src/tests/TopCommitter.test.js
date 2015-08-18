import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

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
        expect(topCommitter.getApiRequest()).to.eql({
            id:     'github.repositoryCommits.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });

    it('should display repository name in header', () => {
        let count = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'widget__header');
        expect(count.getDOMNode().textContent).to.equal('plouc/mozaik top committer');
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