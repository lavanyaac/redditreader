import React, { Component } from 'react';
import DisplaySubscriptions from '../Subscriptions/DisplaySubscriptions';
import DisplaySubReddits from './DisplaySubReddits';
import axios from 'axios';
const SUBSCRIPTIONS_LIST = 'subscriptionslist';


class ManageSubscriptions extends Component {
	constructor(props){
		super(props);
    this.state = {
      subreddits: []
    }
		this.getSubReddits.bind(this);
    this.getSubscriptionList.bind();
	}

  componentDidMount(){
    this.getSubReddits();
  }
  getSubscriptionList(){
    let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
    if(subscriptions){
      subscriptions = JSON.parse(subscriptions);
      this.setState({subscriptions});
    }
    return subscriptions;
  }
  getSubReddits(){
    axios.get(`https://www.reddit.com/subreddits.json`)
    .then(results => {
      const user_subscribed = this.getSubscriptionList();
      const subredditsData = results.data.data.children.map(subreddit => {
        const obj ={};
        obj['id'] = subreddit.data.id;
        obj['user_name_prefixed'] = subreddit.data.display_name;
        obj['display_name'] = subreddit.data.display_name;
        obj['title'] = subreddit.data.title;
        obj['subscribers'] = subreddit.data.subscribers;
        obj['url'] = subreddit.data.url;
        obj['created'] = subreddit.data.created;
        obj['public_description'] = subreddit.data.public_description;
        obj['user_subscribed'] = user_subscribed.some((subscription)=>{
          return subscription === subreddit.data.display_name.toLowerCase();
        })
        return obj;
      });
      this.setState({
        subreddits: subredditsData
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
	render() {
    console.log('subreddits', this.state.subreddits);
    const { subreddits } = this.state
    return (
      <div className="managesubscription">
      	<div><h2>Manage Subscription</h2></div>
        <div className="managesubscription-container">
        	<DisplaySubReddits subreddits={subreddits}/>
        	<DisplaySubscriptions displayManageSubscription={false}/>
        </div>
      </div>

    );
  }
}

export default ManageSubscriptions;