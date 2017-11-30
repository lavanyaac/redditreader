import React, { Component } from 'react';
import DisplaySubscriptions from '../Subscriptions/DisplaySubscriptions';
import DisplaySubReddits from './DisplaySubReddits';
import axios from 'axios';
import update from 'immutability-helper';
const SUBSCRIPTIONS_LIST = 'subscriptionslist';


class ManageSubscriptions extends Component {
	constructor(props){
		super(props);
    this.state = {
      subreddits: [],
      refreshSubscriptions: false
    }
		this.getSubReddits.bind(this);
    this.getSubscriptionList.bind(this);
    this.handleSubscribeUnsubscribeClick.bind(this);
    this.updateSubscription.bind(this);
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

  updateSubscription(subreddit, toSubscribe){
    let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
    subscriptions = subscriptions ? JSON.parse(subscriptions): [];
    if(toSubscribe){
      subscriptions.push(subreddit.toLowerCase());
    }else{
      const index = subscriptions.findIndex((subscription) =>{
        return subscription === subreddit.toLowerCase();
      });
      if(index === -1){
        throw 'Unable to update local storage with: ',subreddit
      }
      subscriptions.splice(index, 1);
    }
    window.localStorage.setItem(SUBSCRIPTIONS_LIST, JSON.stringify(subscriptions));
  }

  handleSubscribeUnsubscribeClick(e, subRedditIndex, subreddit){
    console.log("handleSubscribeUnsubscribeClick");
    const isSubscribed = e.target.className === 'Unsubscribe' ?
    false: true;
    console.log(e, subRedditIndex, subreddit, isSubscribed)
    const updatedList = update(this.state.subreddits, {
        [subRedditIndex]:{
          user_subscribed: {
            $set: isSubscribed          }
        }
      });
      console.log("[$]sub", subRedditIndex, updatedList);
      this.setState({
        subreddits: updatedList,
        refreshSubscriptions: true
      });
      this.updateSubscription(subreddit, isSubscribed);
  }

  updateSubRedditList(subreddit, newUserSubscribedBol){
    console.log(subreddit, newUserSubscribedBol)
    const index = this.state.subreddits.findIndex((subscription)=>{
      return subscription.display_name.toLowerCase() === subreddit.toLowerCase();
    });
    if(index !== -1){
      const updatedList = update(this.state.subreddits,{
        [index]:{
          user_subscribed:{
            $set: newUserSubscribedBol
          }
        }
      });
      console.log(updatedList);
      this.setState({
        subreddits: updatedList
      });
    }
  }
	render() {
    const { subreddits, refreshSubscriptions } = this.state
    return (
      <div className="managesubscription">
      	<div><h2>Manage Subscription</h2></div>
        <div className="managesubscription-container">
        	<DisplaySubReddits 
          subreddits={subreddits}
          handleSubscribeUnsubscribeClick={this.handleSubscribeUnsubscribeClick.bind(this)}/>
        	<DisplaySubscriptions 
          displayManageSubscription={false}
          refreshSubscriptions={refreshSubscriptions}
          updateSubRedditList={this.updateSubRedditList.bind(this)}/>
        </div>
      </div>

    );
  }
}

export default ManageSubscriptions;