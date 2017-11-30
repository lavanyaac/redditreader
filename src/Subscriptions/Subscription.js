import React, { Component } from 'react';

class DisplaySubscriptions extends Component {
	render() {
		const {subscription, subscriptionIndex, handleUnsubscribeClick} = this.props;
    return (
      <li className="subscriptions">
      	<button onClick={()=> handleUnsubscribeClick(subscriptionIndex, subscription)}>
      	Unscubscribe
      	</button>
      	<p>{subscription}</p>
      </li>

    );
  }
}

export default DisplaySubscriptions;