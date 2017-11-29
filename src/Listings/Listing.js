import React, { Component } from 'react';

class Listing extends Component {
	render() {
		const {listing} = this.props;
    const defaultImageSrc = "assets/images/thumbnail-default.jpg";
    const imgSrc = ['default', 'self', 'nsfw'].includes(listing.data.thumbnail)? 
    defaultImageSrc : listing.data.thumbnail;
    return (
      <li className="listing-container">
        <div><p>{listing.data.ups}</p></div>
        <div className="listing-image"><img src={imgSrc} alt="" /></div>
        <div>
          <p>{listing.data.title}</p>
          <p>{listing.data.domain}</p>
          <p>{listing.data.author}</p>
          <p>{listing.data.subreddit_name_prefixed}</p>
          <p>{listing.data.num_comments}</p>
        </div>
      </li>

    );
  }
}

export default Listing;