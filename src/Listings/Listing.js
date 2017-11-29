import React, { Component } from 'react';

class Listing extends Component {
	render() {
		const {listing} = this.props;
    const defaultImageSrc = "assets/images/thumbnail-default.jpg";
    const imgSrc = ['default', 'self', 'nsfw'].includes(listing.data.thumbnail)? 
    defaultImageSrc : listing.data.thumbnail;
    return (
      <li className="listing-container">
        <div><p>{listing.data.ups} Votes</p></div>
        <div className="listing-image"><img src={imgSrc} alt="" /></div>
        <div>
          <a href={listing.data.url} >{listing.data.title}</a>
          <p className="domain-name">{listing.data.domain}</p>
          <p className="additional-info">Submitted by {listing.data.author} to {listing.data.subreddit_name_prefixed}</p>
          <p className="additional-info">{listing.data.num_comments} comments</p>
        </div>
      </li>

    );
  }
}

export default Listing;