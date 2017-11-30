import React, { Component } from 'react';
const moment = require('moment');

class SubReddit extends Component {
  
	render() {
		const{ subreddit, handleSubscribeUnsubscribeClick, subredditIndex } = this.props;
    const subscriptionStatus = subreddit.user_subscribed ? 'Unsubscribe' : 'Subscribe';
    const time = moment(parseFloat(subreddit.created)*1000).fromNow();
    return (
      <li className="subreddit-container">
        <button 
          className={ subscriptionStatus }
          onClick = {(e) => handleSubscribeUnsubscribeClick(e, subredditIndex, subreddit.display_name)}>
          {subscriptionStatus}
        </button>
        <div className='subreddit-info'>
          <div className='subreddit-title-info'>
            <p>{subreddit.display_name}:&nbsp;</p>
            <p>{ ' '+subreddit.title}</p>
          </div>
          <p>{subreddit.public_description}</p>
          <div className='subreddit-subs-info'>
            <p>{subreddit.subscribers} subscribers, </p>
            <p>&nbsp;a community for {time}</p>
          </div>
        </div>

      </li>

    );
  }
}

export default SubReddit;