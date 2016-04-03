import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import mockery     from 'mockery';


let PullRequests;
const sampleRepository   = 'plouc/mozaik';
const samplePullRequests = [
    {
        id:    0,
        title: 'PR-0',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id:    1,
        title: 'PR-1',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    },
    {
        id:    2,
        title: 'PR-2',
        user:  {
            avatar_url: 'http://mozaik.rocks/avatar.gif'
        }
    }
];


test.before(t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    PullRequests = require('./../../src/components/PullRequests.jsx').default;
});


test.after(t => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />);

    t.same(wrapper.instance().getApiRequest(), {
        id:     `github.pullRequests.${sampleRepository}`,
        params: { repository: sampleRepository }
    });
});

test('header should display 0 count by default', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository}/>);

    t.is(wrapper.find('.widget__header__count').text(), '0');
});


test('header should display pull request count when api sent data', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />);
    wrapper.setState({ pullRequests: samplePullRequests });

    t.is(wrapper.find('.widget__header__count').text(), `${samplePullRequests.length}`);
});

test('header title should default to \'<repository_name> Pull Requests\'', t => {
    const wrapper = shallow(<PullRequests repository={sampleRepository} />);

    t.regex(wrapper.find('.widget__header').text(), new RegExp(`^${sampleRepository} Pull Requests`));
});

test('header title should be overridden when passing \'title\' prop', t => {
    const customTitle = 'Custom Title';
    const wrapper     = shallow(<PullRequests repository={sampleRepository} title={customTitle} />);

    t.regex(wrapper.find('.widget__header').text(), new RegExp(`^${customTitle}`));
});
