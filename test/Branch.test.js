/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import Branch      from '../src/components/Branch.jsx';


describe('Mozaïk | Github | Branch component', () => {
    it('should display branch name', () => {
        const branch  = { name: 'develop' };
        const wrapper = shallow(<Branch branch={branch} />);

        expect(wrapper.text()).toContain(branch.name);
    });

    it('should not display user info if not available', () => {
        const branch  = { name: 'develop' };
        const wrapper = shallow(<Branch branch={branch} />);

        expect(wrapper.find('.github__branch__avatar').length).toEqual(0);
    });

    it('should display user info if available', () => {
        const branch  = {
            name:   'develop',
            commit: {
                author: {
                    login:      'plouc',
                    avatar_url: 'http://mozaik.rocks/avatar.gif'
                }
            }
        };
        const wrapper = shallow(<Branch branch={branch} />);

        expect(wrapper.text()).toContain(`by ${branch.commit.author.login}`);
        const avatar = wrapper.find('.github__branch__avatar');
        expect(avatar.length).toEqual(1);
        const avatarImg = avatar.find('img');
        expect(avatarImg.length).toEqual(1);
        expect(avatarImg.prop('src')).toEqual(branch.commit.author.avatar_url);
    });
});
