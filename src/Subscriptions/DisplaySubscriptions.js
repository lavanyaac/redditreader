import React, { Component } from 'react';
import Subscription from './Subscription';

class DisplaySubscriptions extends Component {
	render() {
		const {subscriptions} = this.props;
    console.log(subscriptions);
    const subscriptionsList = subscriptions.length === 0 ?
        <div>
          <p>Click on Edit Subscription button to Subscribe to a reddit</p>
        </div>
       :<ul>
          {
            subscriptions.map((subscription, i) => (
              <Subscription subscription={subscription} key={i} index={i}/>
            ))
          }
        </ul>
    return (
      <div className="subscriptions-container">
        <h2> Subscriptions List </h2>
        { subscriptionsList }
      </div>

    );
  }
}

export default DisplaySubscriptions;