import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import UserBadge   from './../../src/components/UserBadge'


const sampleUser = 'plouc'

test('should return correct api request', t => {
    t.deepEqual(UserBadge.getApiRequest({
        user: sampleUser,
    }), {
        id:     `github.user.${sampleUser}`,
        params: { user: sampleUser }
    })
})

test('should be able to display user name without api response', t => {
    const wrapper = shallow(<UserBadge user={sampleUser} />)

    t.is(wrapper.find('.widget__header').text(), `${sampleUser} github user`)
})

test('should display info on api response', t => {
    const userInfo = {
        avatar_url:   'http://mozaik.rocks/avatar.gif',
        public_repos: 10,
        public_gists: 11,
        followers:    12,
        following:    13,
        company:      'ploucorp',
    }
    const wrapper = shallow(<UserBadge user={sampleUser} apiData={userInfo} />)

    const avatarImg = wrapper.find('.github__user-badge__avatar').find('img')
    t.is(avatarImg.length, 1)
    t.is(avatarImg.prop('src'), userInfo.avatar_url)
    const infoText = wrapper.find('.github__user-badge__info').text()
    t.regex(infoText, new RegExp(`${userInfo.public_repos}public repos`))
    t.regex(infoText, new RegExp(`${userInfo.public_gists}public gists`))
    t.regex(infoText, new RegExp(`${userInfo.followers}followers`))
    t.regex(infoText, new RegExp(`${userInfo.following}following`))
    t.regex(infoText, new RegExp(`company${userInfo.company}`))
})
