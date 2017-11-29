import React, { Component } from 'react';

class Listing extends Component {
	render() {
		const {listing, index} = this.props;
    return (
      <li className="listing-container">
        <p>{listing.data.title}</p>
        <p>{listing.data.domain}</p>
        <p>{listing.data.author}</p>
        <p>{listing.data.subreddit_name_prefixed}</p>
        <p>{listing.data.num_comments}</p>
      </li>

    );
  }
}

export default Listing;