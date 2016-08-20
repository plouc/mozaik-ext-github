import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import StatusIcon  from '../../src/components/StatusIcon'


test('should display a check icon when \'status\' is \'good\'', t  => {
    const wrapper = shallow(<StatusIcon status="good" message="good" />)

    t.regex(wrapper.find('.fa').prop('className'), /fa-check-square/)
})

test('should display a warning icon when \'status\' is not \'good\'', t  => {
    const wrapper = shallow(<StatusIcon status="bad" message="bad" />)

    t.regex(wrapper.find('.fa').prop('className'), /fa-warning/)
})
