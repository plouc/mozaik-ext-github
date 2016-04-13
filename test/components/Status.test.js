import test            from 'ava';
import React           from 'react';
import { shallow }     from 'enzyme';
import mockery         from 'mockery';
import StatusIcon      from '../../src/components/StatusIcon.jsx';
import StatusTimestamp from '../../src/components/StatusTimestamp.jsx';


let Status;


test.before('before', t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    Status = require('../../src/components/Status.jsx').default;
});


test.after('after', t => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t  => {
    const wrapper = shallow(<Status />);

    t.deepEqual(wrapper.instance().getApiRequest(), { id: 'github.status' });
});


test('having no status, it should show an empty widget body', t => {
    const wrapper = shallow(<Status />);

    t.is(wrapper.find('.widget__body').text(), '');
});


const stateOk  = {
    status: {
        status:     'good',
        body:       'everythings good',
        created_on: new Date().toISOString()
    }
};


test('having a \'good\' status message, it should display a status icon with correct status', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateOk);

    const icon = wrapper.find(StatusIcon);
    t.is(icon.length, 1);
    t.is(icon.prop('status'), stateOk.status.status);
});


test('having a \'good\' status message, it should not display a status message', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateOk);

    t.is(wrapper.find('.github__status__current__message').length, 0);
});


test('having a \'good\' status message, it should display a from-now timestamp', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateOk);

    const statusTimestamp = wrapper.find(StatusTimestamp);
    t.is(statusTimestamp.length, 1);
    t.is(statusTimestamp.prop('timestamp'), stateOk.status.created_on);
});


const stateKo  = {
    status: {
        status:     'bad',
        body:       'everythings so bad :(',
        created_on: new Date().toISOString()
    }
};


test('having a \'bad\' status message, it should display a status icon with correct status', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateKo);

    const icon = wrapper.find(StatusIcon);
    t.is(icon.length, 1);
    t.is(icon.prop('status'), stateKo.status.status);
});


test('having a \'bad\' status message, it should display a status message', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateKo);

    t.is(wrapper.find('.github__status__current__message').text(), stateKo.status.body);
});


test('having a \'bad\' status message, it should display a from-now timestamp', t => {
    const wrapper = shallow(<Status />);
    wrapper.setState(stateKo);

    const statusTimestamp = wrapper.find(StatusTimestamp);
    t.is(statusTimestamp.length, 1);
    t.is(statusTimestamp.prop('timestamp'), stateKo.status.created_on);
});
