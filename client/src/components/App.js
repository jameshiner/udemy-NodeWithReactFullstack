import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// allows react components to call action creators
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// App.propTypes = {
//   fetchUser: PropTypes.func.isRequired,
// };

// assigns the actions to the App comp as props to be referenced as this.props.fetchUser for ex
export default connect(null, actions)(App);
