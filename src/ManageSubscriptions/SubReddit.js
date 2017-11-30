import React, { Component } from 'react';

class SubReddit extends Component {
  
	render() {
		const{ subreddit, handleSubscribeUnsubscribeClick, itemIndex } = this.props;
    const subscriptionStatus = subreddit.user_subscribed ? 'Unsubscribe' : 'Subscribe';

    return (
      <li className="subreddit-container">
        <button 
          className={ subscriptionStatus }>
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
            <p>&nbsp;a community for {}</p>
          </div>
        </div>

      </li>

    );
  }
}

export default SubReddit;