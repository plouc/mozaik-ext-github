import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import Branches    from './../../src/components/Branches'
import {
    WidgetHeader,
    WidgetLoader,
} from 'mozaik/ui'


const sampleRepository = 'plouc/mozaik'
const sampleBranches   = [
    { name: 'master'      },
    { name: 'develop'     },
    { name: 'ftr-xxx'     },
    { name: 'hot-fix-xxx' },
]

test('should return correct api request', t => {
    t.deepEqual(Branches.getApiRequest({
        repository: sampleRepository,
    }), {
        id:     `github.branches.${sampleRepository}`,
        params: { repository: sampleRepository }
    })
})

test('should display loader if no apiData available', t => {
    const wrapper = shallow(<Branches repository={sampleRepository}/>)

    t.is(wrapper.find(WidgetLoader).length, 1)
})

/*
test('header should display 0 count by default', t => {
    const wrapper = shallow(<Branches repository={sampleRepository} />)

    t.is(wrapper.find('.widget__header__count').text(), '0')
})
*/

test('header should display branch count when api sent data', t => {
    const wrapper = shallow(
        <Branches
            repository={sampleRepository}
            apiData={{ branches: sampleBranches }}
        />
    )

    t.is(wrapper.find(WidgetHeader).prop('count'), sampleBranches.length)
})

test('should allow title override', t => {
    const wrapper = shallow(
        <Branches
            repository={sampleRepository}
            title="override"
        />
    )

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), 'override')
    t.is(header.prop('subject'), null)
})

/*
test('header should display repository name by default', t => {
    const wrapper = shallow(<Branches repository={sampleRepository} />)

    t.regex(wrapper.find('.widget__header').text(), new RegExp(sampleRepository))
})


test('header should allow title override', t => {
    const title   = 'custom title'
    const wrapper = shallow(<Branches repository={sampleRepository} title={title} />)

    t.regex(wrapper.find('.widget__header').text(), new RegExp(title))
})


test('body should display no branch by default', t => {
    const wrapper = shallow(<Branches repository={sampleRepository} />)

    t.is(wrapper.find('.github__branch').length, 0)
})


test('should display a list of all branches when api sent data', t => {
    const wrapper = shallow(
        <Branches
            repository={sampleRepository}
            apiData={sampleBranches}
        />
    )

    t.is(wrapper.find('.widget__body').children().length, sampleBranches.length)
})
*/