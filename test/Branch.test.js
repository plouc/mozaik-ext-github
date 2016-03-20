import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import Branch      from '../src/components/Branch.jsx';


test('should display branch name', t => {
    const branch  = { name: 'develop' };
    const wrapper = shallow(<Branch branch={branch} />);

    t.is(wrapper.text().trim(), branch.name);
});


test('should not display user info if not available', t => {
    const branch  = { name: 'develop' };
    const wrapper = shallow(<Branch branch={branch} />);

    t.is(wrapper.find('.github__branch__avatar').length, 0);
});


test('should display user info if available', t => {
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

    t.regex(wrapper.text(), new RegExp(`by ${branch.commit.author.login}`));
    const avatar = wrapper.find('.github__branch__avatar');
    t.is(avatar.length, 1);
    const avatarImg = avatar.find('img');
    t.is(avatarImg.length, 1);
    t.is(avatarImg.prop('src'), branch.commit.author.avatar_url);
});
