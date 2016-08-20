import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import mockery     from 'mockery';
import moment      from 'moment';


let TopCommitter;
const sampleRepository = 'plouc/mozaik';


test.before(t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    TopCommitter = require('./../../src/components/TopCommitter').default;
});


test.after(t => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<TopCommitter repository={sampleRepository} />);

    let since = moment().startOf('day').format();
    let until = moment().endOf('day').format();

    t.deepEqual(wrapper.instance().getApiRequest(), {
        id:     `github.repositoryCommits.${sampleRepository}.${since}.${until}`,
        params: {
            repository: sampleRepository,
            since, until
        }
    });
});


test('header should display repository name by default', t => {
    const wrapper = shallow(<TopCommitter repository={sampleRepository} />);

    t.regex(wrapper.find('.widget__header').text(), new RegExp(sampleRepository));
});


test('header should allow title override', t => {
    const title   = 'custom title';
    const wrapper = shallow(<TopCommitter repository={sampleRepository} title={title} />);

    t.regex(wrapper.find('.widget__header').text(), new RegExp(title));
});


test('should display top committer info and commit count', t => {
    const wrapper = shallow(<TopCommitter repository={sampleRepository} />);
    const state   = {
        topCommitter: {
            login:      'plouc',
            avatar_url: 'http://avatar.io/plouc'
        }
    };
    wrapper.setState(state);

    /*
    let img = TestUtils.scryRenderedDOMComponentsWithTag(topCommitter, 'img');
    expect(img).to.have.length(1);
    img = img[0];
    expect(img.props).to.have.property('src');
    expect(img.props.src).to.equal('http://avatar.io/plouc');

    let username = TestUtils.findRenderedDOMComponentWithClass(topCommitter, 'github__top-committer__info');
    expect(username.getDOMNode().textContent).to.contain('plouc');
    */
});
