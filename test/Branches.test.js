/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import mockery     from 'mockery';


let Branches;
const sampleRepository = 'plouc/mozaik';
const sampleBranches   = [
    { name: 'master'      },
    { name: 'develop'     },
    { name: 'ftr-xxx'     },
    { name: 'hot-fix-xxx' }
];


describe('Mozaïk | Github | Branches component', () => {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        Branches = require('./../src/components/Branches.jsx').default;
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        const wrapper = shallow(<Branches repository={sampleRepository} />);

        expect(wrapper.instance().getApiRequest()).toEqual({
            id:     `github.branches.${sampleRepository}`,
            params: { repository: sampleRepository }
        });
    });


    describe('header', () => {
        it('should display 0 count by default', () => {
            const wrapper = shallow(<Branches repository={sampleRepository} />);

            expect(wrapper.find('.widget__header__count').text()).toEqual('0');
        });

        it('should display branch count when api sent data', () => {
            const wrapper = shallow(<Branches repository={sampleRepository} />);
            wrapper.setState({ branches: sampleBranches });

            expect(wrapper.find('.widget__header__count').text()).toEqual(`${sampleBranches.length}`);
        });

        it('should display repository name by default', () => {
            const wrapper = shallow(<Branches repository={sampleRepository} />);

            expect(wrapper.find('.widget__header').text()).toContain(sampleRepository);
        });

        it('should allow title override', () => {
            const title   = 'custom title';
            const wrapper = shallow(<Branches repository={sampleRepository} title={title} />);

            expect(wrapper.find('.widget__header').text()).toNotContain(sampleRepository);
            expect(wrapper.find('.widget__header').text()).toContain(title);
        });
    });

    describe('body', () => {
        it('should display no branch by default', () => {
            const wrapper = shallow(<Branches repository={sampleRepository} />);

            expect(wrapper.find('.github__branch').length).toEqual(0);
        });

        it('should display a list of all branches when api sent data', () => {
            const wrapper = shallow(<Branches repository={sampleRepository} />);
            wrapper.setState({ branches: sampleBranches });

            expect(wrapper.find('.widget__body').children().length).toEqual(sampleBranches.length);
        });
    });
});
