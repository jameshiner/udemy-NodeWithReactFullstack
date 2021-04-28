import React, { Component } from 'react';
// allows react components to call action creators
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    const { user } = this.props;

    switch (user) {
      case null:
        return '';
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          // since this list is static, we can just set key to 1, 2, 3 and it will be unique
          <li key="1"><Payments /></li>,
          <li key="2" style={{ margin: '0 10px' }}>
            Credits:
            {' '}
            {user.credits}
          </li>,
          <li key="3"><a href="/api/user/logout">Logout</a></li>,
        ];
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="row">
              <div className="col s12">
                <Link to={user ? '/surveys' : '/'} className="left brand-logo">Emaily</Link>
                <ul className="right">
                  {this.renderContent()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

// paramater is 'state'
function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Header);
