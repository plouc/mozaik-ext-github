import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import Branch      from '../../src/components/Branch'
import {
    //WidgetListItem,
    WidgetAvatar,
} from 'mozaik/ui'

/*
test('should display branch name', t => {
    const branch  = { name: 'develop', _links: { html: 'http://test.com' } }
    const wrapper = shallow(<Branch branch={branch} />)

    t.is(wrapper.find(WidgetListItem).prop('title'), branch.name)
})
*/

test('should not display user info if not available', t => {
    const branch  = { name: 'develop', _links: { html: 'http://test.com' } }
    const wrapper = shallow(<Branch branch={branch} />)

    t.is(wrapper.find(WidgetAvatar).length, 0)
})

/*
test('should display user info if available', t => {
    const branch  = {
        name:   'develop',
        _links: { html: 'http://test.com' },
        commit: {
            author: {
                login:      'plouc',
                avatar_url: 'http://mozaik.rocks/avatar.gif',
                html_url:   'http://test.com'
            }
        }
    }
    const wrapper = shallow(<Branch branch={branch} />)

    //t.regex(wrapper.text(), new RegExp(`by ${branch.commit.author.login}`))
    const avatar = wrapper.find(WidgetAvatar)
    t.is(avatar.length, 1)
    const avatarImg = avatar.find('img')
    t.is(avatarImg.length, 1)
    t.is(avatarImg.prop('src'), branch.commit.author.avatar_url)
})
*/
