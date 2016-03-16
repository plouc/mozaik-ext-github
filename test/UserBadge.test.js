/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import mockery     from 'mockery';


const sampleUser = 'plouc';
let UserBadge;


describe('Mozaïk | Github | UserBadge component', () => {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        UserBadge = require('./../src/components/UserBadge.jsx').default;
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });

    it('should return correct api request', () => {
        const wrapper = shallow(<UserBadge user={sampleUser} />);

        expect(wrapper.instance().getApiRequest()).toEqual({
            id:     `github.user.${sampleUser}`,
            params: { user: sampleUser }
        });
    });

    it('should be able to display user name without api response', () => {
        const wrapper = shallow(<UserBadge user={sampleUser} />);

        expect(wrapper.find('.widget__header').text()).toContain(`${sampleUser} github user`);
    });

    it('should display info on api response', () => {
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
        expect(avatarImg.length).toEqual(1);
        expect(avatarImg.prop('src')).toEqual(state.user.avatar_url);

        const infoText = wrapper.find('.github__user-badge__info').text();
        expect(infoText).toContain(`${state.user.public_repos} public repos`);
        expect(infoText).toContain(`${state.user.public_gists} public gists`);
        expect(infoText).toContain(`${state.user.followers} followers`);
        expect(infoText).toContain(`${state.user.following} following`);
        expect(infoText).toContain(`company: ${state.user.company}`);
    });
});
