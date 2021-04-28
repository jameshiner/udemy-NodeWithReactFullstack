import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  componentDidMount() {

  }

  render() {
    const { handleStripeToken } = this.props;

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 survey credits"
        amount={500}
        token={(token) => handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
      >
        <button type="button" className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
