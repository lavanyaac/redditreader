import React, { Component } from 'react';
import SubReddit from './SubReddit';

class DisplaySubReddits extends Component {
	render() {
		const { subreddits, handleSubscribeUnsubscribeClick } = this.props;
    return (
    	subreddits.length === 0? null:
      <ul className="subreddits-container">
      	{
      		subreddits.map((subreddit, i) => (
      			<SubReddit 
            subreddit={subreddit} 
            key={subreddit.id} 
            subredditIndex={i}
            handleSubscribeUnsubscribeClick={handleSubscribeUnsubscribeClick}/>))
      	}
      </ul>

    );
  }
}

export default DisplaySubReddits;