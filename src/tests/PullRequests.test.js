import React        from 'react/addons';
const { TestUtils } = React.addons;
import PullRequests from './../components/PullRequests.jsx';
import { expect }   from 'chai';

var pullRequests;

describe('Github — PullRequests', () => {

    beforeEach(() => {
        pullRequests = TestUtils.renderIntoDocument(<PullRequests repository="plouc/mozaik" />);
    });

    it('should return correct api request', () => {
        expect(pullRequests.getApiRequest()).to.eql({
            id:     'github.pullRequests.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });

    it('should display 0 count by default', () => {
        let count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).to.equal('0');
    });

    it('will update with given array of pull requests', () => {
        pullRequests.setState({
            pullRequests: [
                {
                    id: 0,
                    title: 'PR-0',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 1,
                    title: 'PR-1',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 2,
                    title: 'PR-2',
                    user: {
                        avatar_url: 0
                    }
                }
            ]
        });

        let count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).to.equal('3');
    });
});