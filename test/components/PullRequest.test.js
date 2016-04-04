import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import PullRequest from '../../src/components/PullRequest.jsx';


test('should display pull request title and user avatar', t  => {
    const pullRequest = {
        title: 'test PR',
        user:  {
            avatar_url: 'http://test.org/avatar'
        }
    };

    const wrapper = shallow(<PullRequest pullRequest={pullRequest} />);

    t.is(wrapper.find('img').prop('src'), pullRequest.user.avatar_url);
    t.regex(wrapper.text(), new RegExp(pullRequest.title));
});
