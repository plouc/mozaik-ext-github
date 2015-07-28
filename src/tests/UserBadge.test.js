import React        from 'react/addons';
const { TestUtils } = React.addons;
import UserBadge    from './../components/UserBadge.jsx';
import { expect }   from 'chai';

var userBadge;

describe('Github — UserBadge', () => {

    beforeEach(() => {
        userBadge = TestUtils.renderIntoDocument(<UserBadge user="plouc" />);
    });

    it('should return correct api request', () => {
        expect(userBadge.getApiRequest()).to.eql({
            id:     'github.user.plouc',
            params: {
                user: 'plouc'
            }
        });
    });

    it('should display user name', () => {
        let username = TestUtils.findRenderedDOMComponentWithClass(userBadge, 'widget__header');
        expect(username.getDOMNode().textContent).to.equal('plouc github user');
    });
});