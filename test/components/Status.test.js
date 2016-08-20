import test            from 'ava'
import React           from 'react'
import { shallow }     from 'enzyme'
import StatusIcon      from '../../src/components/StatusIcon'
import StatusTimestamp from '../../src/components/StatusTimestamp'
import Status          from '../../src/components/Status'


const stateOk  = {
    status:     'good',
    body:       'everythings good',
    created_on: new Date().toISOString(),
}

const stateKo  = {
    status:     'bad',
    body:       'everythings so bad :(',
    created_on: new Date().toISOString(),
}

test('should return correct api request', t  => {
    t.deepEqual(Status.getApiRequest(), { id: 'github.status' })
})

test('having no status, it should show an empty widget body', t => {
    const wrapper = shallow(<Status />)

    t.is(wrapper.find('.widget__body').text(), '')
})

test('having a \'good\' status message, it should display a status icon with correct status', t => {
    const wrapper = shallow(<Status apiData={stateOk}/>)

    const icon = wrapper.find(StatusIcon)
    t.is(icon.length, 1)
    t.is(icon.prop('status'), stateOk.status)
})

test('having a \'good\' status message, it should not display a status message', t => {
    const wrapper = shallow(<Status apiData={stateOk}/>)

    t.is(wrapper.find('.github__status__current__message').length, 0)
})

test('having a \'good\' status message, it should display a from-now timestamp', t => {
    const wrapper = shallow(<Status apiData={stateOk}/>)

    const statusTimestamp = wrapper.find(StatusTimestamp)
    t.is(statusTimestamp.length, 1)
    t.is(statusTimestamp.prop('timestamp'), stateOk.created_on)
})

test('having a \'bad\' status message, it should display a status icon with correct status', t => {
    const wrapper = shallow(<Status apiData={stateKo}/>)

    const icon = wrapper.find(StatusIcon)
    t.is(icon.length, 1)
    t.is(icon.prop('status'), stateKo.status)
})

test('having a \'bad\' status message, it should display a status message', t => {
    const wrapper = shallow(<Status apiData={stateKo}/>)

    t.is(wrapper.find('.github__status__current__message').text(), stateKo.body)
})

test('having a \'bad\' status message, it should display a from-now timestamp', t => {
    const wrapper = shallow(<Status apiData={stateKo}/>)

    const statusTimestamp = wrapper.find(StatusTimestamp)
    t.is(statusTimestamp.length, 1)
    t.is(statusTimestamp.prop('timestamp'), stateKo.created_on)
})
