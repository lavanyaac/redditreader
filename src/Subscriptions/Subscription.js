import React, { Component } from 'react';

class DisplaySubscriptions extends Component {
	render() {
		const {subscription} = this.props;
    return (
      <li className="subscriptions">
      	<button>Unscubscribe</button>
      	<p>{subscription}</p>
      </li>

    );
  }
}

export default DisplaySubscriptions;