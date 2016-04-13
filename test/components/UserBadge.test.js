import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import mockery     from 'mockery';


const sampleUser = 'plouc';
let UserBadge;


test.before('before hook', t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    UserBadge = require('./../../src/components/UserBadge.jsx').default;
});


test.after('after hook', () => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<UserBadge user={sampleUser} />);

    t.deepEqual(wrapper.instance().getApiRequest(), {
        id:     `github.user.${sampleUser}`,
        params: { user: sampleUser }
    });
});


test('should be able to display user name without api response', t => {
    const wrapper = shallow(<UserBadge user={sampleUser} />);

    t.is(wrapper.find('.widget__header').text(), `${sampleUser} github user`);
});


test('should display info on api response', t => {
    const state = {
        user: {
            avatar_url:   'http://mozaik.rocks/avatar.gif',
            public_repos: 10,
            public_gists: 11,
            followers:    12,
            following:    13,
            company:      'ploucorp'
        }
    };
    const wrapper = shallow(<UserBadge user={sampleUser} />);
    wrapper.setState(state);

    const avatarImg = wrapper.find('.github__user-badge__avatar').find('img');
    t.is(avatarImg.length, 1);
    t.is(avatarImg.prop('src'), state.user.avatar_url);
    const infoText = wrapper.find('.github__user-badge__info').text();
    t.regex(infoText, new RegExp(`${state.user.public_repos}public repos`));
    t.regex(infoText, new RegExp(`${state.user.public_gists}public gists`));
    t.regex(infoText, new RegExp(`${state.user.followers}followers`));
    t.regex(infoText, new RegExp(`${state.user.following}following`));
    t.regex(infoText, new RegExp(`company${state.user.company}`));
});
