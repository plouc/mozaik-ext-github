import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';


var Branches;
var branches;


const sampleBranches = [
    {
        name:   'master'
    },
    {
        name:   'develop',
        commit: {
            author: {
                login:      'plouc',
                avatar_url: 'http://avatar.io/plouc'
            }
        }
    },
    {
        name:   'ftr-xxx'
    },
    {
        name:   'hot-fix-xxx'
    }
];


describe('Github — Branches', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        Branches = require('./../components/Branches.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        branches = TestUtils.renderIntoDocument(<Branches repository="plouc/mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        expect(branches.getApiRequest()).to.eql({
            id:     'github.branches.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });


    describe('header', () => {
        it('should display 0 count by default', () => {
            let count = TestUtils.findRenderedDOMComponentWithClass(branches, 'widget__header__count');
            expect(count.getDOMNode().textContent).to.equal('0');
        });

        it('should display branch count when api sent data', () => {
            branches.setState({ branches: sampleBranches });

            let count = TestUtils.findRenderedDOMComponentWithClass(branches, 'widget__header__count');
            expect(count.getDOMNode().textContent).to.equal('4');
        });

        it('should display repository name by default', () => {
            let title = TestUtils.findRenderedDOMComponentWithClass(branches, 'widget__header');
            expect(title.getDOMNode().textContent).to.contain('plouc/mozaik');
        });

        it('should allow title override', () => {
            branches = TestUtils.renderIntoDocument(<Branches repository="plouc/mozaik" title="custom title"/>);

            let title = TestUtils.findRenderedDOMComponentWithClass(branches, 'widget__header');
            expect(title.getDOMNode().textContent).to.contain('custom title');
        });
    });


    describe('body', () => {
        it('should display no branch by default', () => {
            let branchNodes = TestUtils.scryRenderedDOMComponentsWithClass(branches, 'github__branch');
            expect(branchNodes).to.have.length(0);
        });

        it('should display a list of all branches when api sent data', () => {
            branches.setState({ branches: sampleBranches });

            let branchNodes = TestUtils.scryRenderedDOMComponentsWithClass(branches, 'github__branch');
            expect(branchNodes).to.have.length(4);
        });

        describe('branch item', () => {
            it('should display branch name', () => {
                branches.setState({ branches: sampleBranches });

                let branchNodes = TestUtils.scryRenderedDOMComponentsWithClass(branches, 'github__branch');
                sampleBranches.forEach((sampleBranch, pos) => {
                    expect(branchNodes[pos].getDOMNode().textContent).to.contain(sampleBranch.name);
                });
            });

            it('should not display user info if not available', () => {
                branches.setState({ branches: sampleBranches });

                let branchNodes         = TestUtils.scryRenderedDOMComponentsWithClass(branches, 'github__branch');
                let branchWithoutAuthor = branchNodes[0];

                let avatarNodes = TestUtils.scryRenderedDOMComponentsWithClass(branchWithoutAuthor, 'github__branch__avatar');
                expect(avatarNodes).to.have.length(0);
            });

            it('should display user info if available', () => {
                branches.setState({ branches: sampleBranches });

                let branchNodes      = TestUtils.scryRenderedDOMComponentsWithClass(branches, 'github__branch');
                let branchWithAuthor = branchNodes[1];

                expect(branchWithAuthor.getDOMNode().textContent).to.contain('by plouc');

                let avatar = TestUtils.findRenderedDOMComponentWithClass(branchWithAuthor, 'github__branch__avatar');
                let img    = TestUtils.scryRenderedDOMComponentsWithTag(avatar, 'img');
                expect(img).to.have.length(1);
                img = img[0];
                expect(img.props).to.have.property('src');
                expect(img.props.src).to.equal('http://avatar.io/plouc');
            });
        });
    });
});
