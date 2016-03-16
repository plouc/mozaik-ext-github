/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import mockery     from 'mockery';


let PullRequests;
const sampleRepository   = 'plouc/mozaik';
const samplePullRequests = [
    {
        id: 0,
        title: 'PR-0',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id: 1,
        title: 'PR-1',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id: 2,
        title: 'PR-2',
        user: {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    }
];


describe('Mozaïk | Github | PullRequests component', () => {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        PullRequests = require('./../src/components/PullRequests.jsx').default;
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });

    it('should return correct api request', () => {
        const wrapper = shallow(<PullRequests repository={sampleRepository} />);

        expect(wrapper.instance().getApiRequest()).toEqual({
            id:     `github.pullRequests.${sampleRepository}`,
            params: { repository: sampleRepository }
        });
    });

    describe('header', () => {
        it('should display 0 count by default', () => {
            const wrapper = shallow(<PullRequests repository={sampleRepository}/>);

            expect(wrapper.find('.widget__header__count').text()).toEqual('0');
        });

        it('should display pull request count when api sent data', () => {
            const wrapper = shallow(<PullRequests repository={sampleRepository} />);
            wrapper.setState({ pullRequests: samplePullRequests });

            expect(wrapper.find('.widget__header__count').text()).toEqual(`${samplePullRequests.length}`);
        });
    });
    /*

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
    */
});
