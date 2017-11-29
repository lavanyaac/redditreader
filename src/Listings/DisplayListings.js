import React, { Component } from 'react';
import Listing from './Listing';

class DisplayListings extends Component {
	render() {
		const {listings} = this.props;
    return (
    	listings.length === 0 ? null:
      <ul className="listings-container">
      	{listings.map((listing, i) => (
      		<Listing listing={listing} key={listing.data.id} index={i}/>
      		))}
      </ul>

    );
  }
}

export default DisplayListings;