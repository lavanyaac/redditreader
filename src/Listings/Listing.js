import React, { Component } from 'react';
const moment = require('moment');

class Listing extends Component {
	render() {
		const {listing} = this.props;
    const defaultImageSrc = "assets/images/thumbnail-default.jpg";
    const imgSrc = ['default', 'self', 'nsfw', ''].includes(listing.data.thumbnail)? 
    defaultImageSrc : listing.data.thumbnail;
    const time = moment(parseFloat(listing.data.created)*1000).fromNow();
    return (
      <li className="listing-container">
        <div className="votes"><p>{listing.data.ups} Votes</p></div>
        <div className="listing-image"><img src={imgSrc} alt="" /></div>
        <div className="listing-info">
          <a href={listing.data.url} >{listing.data.title}</a>
          <p className="domain-name">{listing.data.domain}</p>
          <p className="additional-info">Submitted <span>{time}</span> by <span>{listing.data.author}</span> to <span>{listing.data.subreddit_name_prefixed}</span></p>
          <p className="additional-info">{listing.data.num_comments} comments</p>
        </div>
      </li>

    );
  }
}

export default Listing;