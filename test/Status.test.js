/* global describe it */
import React           from 'react';
import { shallow }     from 'enzyme';
import expect          from 'expect';
import mockery         from 'mockery';
import StatusIcon      from '../src/components/StatusIcon.jsx';
import StatusTimestamp from '../src/components/StatusTimestamp.jsx';


let Status;


describe('Mozaïk | Github | Status component', () => {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        Status = require('./../src/components/Status.jsx').default;
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', ()  => {
        const wrapper = shallow(<Status />);

        expect(wrapper.instance().getApiRequest()).toEqual({ id: 'github.status' });
    });

    describe('having no status', () => {
        it('should show an empty widget body', () => {
            const wrapper = shallow(<Status />);

            expect(wrapper.find('.widget__body').text()).toEqual('');
        });
    });

    describe(`having a 'good' status message`, () => {
        const state  = {
            status: {
                status:     'good',
                body:       'everythings good',
                created_on: new Date().toISOString()
            }
        };

        it(`should display a status icon with correct status`, () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            const icon = wrapper.find(StatusIcon);
            expect(icon.length).toEqual(1);
            expect(icon.prop('status')).toEqual(state.status.status);
        });

        it('should not display a status message', () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            expect(wrapper.find('.github__status__current__message').length).toEqual(0);
        });

        it('should display a from-now timestamp', () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            const statusTimestamp = wrapper.find(StatusTimestamp);
            expect(statusTimestamp.length).toEqual(1);
            expect(statusTimestamp.prop('timestamp')).toEqual(state.status.created_on);
        });
    });

    describe(`having a 'bad' status message`, () => {
        const state  = {
            status: {
                status:     'bad',
                body:       'everythings so bad :(',
                created_on: new Date().toISOString()
            }
        };

        it(`should display a status icon with correct status`, () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            const icon = wrapper.find(StatusIcon);
            expect(icon.length).toEqual(1);
            expect(icon.prop('status')).toEqual(state.status.status);
        });

        it('should display a status message', () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            expect(wrapper.find('.github__status__current__message').text()).toEqual(state.status.body);
        });

        it('should display a from-now timestamp', () => {
            const wrapper = shallow(<Status />);
            wrapper.setState(state);

            const statusTimestamp = wrapper.find(StatusTimestamp);
            expect(statusTimestamp.length).toEqual(1);
            expect(statusTimestamp.prop('timestamp')).toEqual(state.status.created_on);
        });
    });
});
