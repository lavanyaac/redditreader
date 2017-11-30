import React, { Component } from 'react';
import DisplaySubscriptions from '../Subscriptions/DisplaySubscriptions';
import DisplaySubReddits from './DisplaySubReddits';
import Pagination from '../utilities/Pagination';
import MoveToTop from '../utilities/MoveToTop'
import axios from 'axios';
import update from 'immutability-helper';
const SUBSCRIPTIONS_LIST = 'subscriptionslist';


class ManageSubscriptions extends Component {
	constructor(props){
		super(props);
    this.state = {
      subreddits: [],
      after: '',
      before: '',
      count: 0,
      refreshSubscriptions: false
    }
		this.getSubReddits.bind(this);
    this.getSubscriptionList.bind(this);
    this.handleSubscribeUnsubscribeClick.bind(this);
    this.updateSubscription.bind(this);
	}

  componentDidMount(){
    this.getSubReddits('', '');
  }
  componentDidUpdate(){
    window.scrollTo(0, 0);
  }
  getSubscriptionList(){
    let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
    if(subscriptions){
      subscriptions = JSON.parse(subscriptions);
      this.setState({subscriptions});
    }
    subscriptions = subscriptions || [];
    return subscriptions;
  }
  getSubReddits(before, after, type='add'){
    let url;
    if(this.state.count === 0){
      url = `https://www.reddit.com/subreddits.json`;
    }else if(after !== ''){
      url = `https://www.reddit.com/subreddits.json?count=${this.state.count}&after=${after}`;
    }else if(before !== ''){
      url = `https://www.reddit.com/subreddits.json?count=${this.state.count}&before=${before}`;
    }else{
      console.log('Error with subreddits request');
    }
    axios.get(url)
    .then(results => {
      const user_subscribed = this.getSubscriptionList();
      const after = results.data.data.after === null? '': results.data.data.after;
      const before = results.data.data.before === null? '': results.data.data.before;
      const addCount = type === 'add' ? 25 : -25;
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
        subreddits: subredditsData, after, before,
        count: this.state.count + addCount
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
        throw new Error('Unable to update local storage with subscriptions');
      }
      subscriptions.splice(index, 1);
    }
    window.localStorage.setItem(SUBSCRIPTIONS_LIST, JSON.stringify(subscriptions));
  }

  handleSubscribeUnsubscribeClick(e, subRedditIndex, subreddit){
    const isSubscribed = e.target.className === 'Unsubscribe' ?
    false: true;
    const updatedList = update(this.state.subreddits, {
        [subRedditIndex]:{
          user_subscribed: {
            $set: isSubscribed          }
        }
      });
      this.setState({
        subreddits: updatedList,
        refreshSubscriptions: true
      });
      this.updateSubscription(subreddit, isSubscribed);
  }

  updateSubRedditList(subreddit, newUserSubscribedBol){
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
      this.setState({
        subreddits: updatedList
      });
    }
  }
	render() {
    const { subreddits, refreshSubscriptions, before, after, count } = this.state
    return (
      <div className="managesubscription">
      	<div><h2>Manage Subscription</h2></div>
        <div className="managesubscription-container">
        	<DisplaySubReddits 
          subreddits={subreddits}
          handleSubscribeUnsubscribeClick={this.handleSubscribeUnsubscribeClick.bind(this)}/>
          <Pagination 
              before={before} 
              after={after} 
              count={count}
              callback={this.getSubReddits.bind(this)}/>
        	<DisplaySubscriptions 
          displayManageSubscription={false}
          refreshSubscriptions={refreshSubscriptions}
          updateSubRedditList={this.updateSubRedditList.bind(this)}/>
        </div>
        <MoveToTop scrollStepInPx="50" delayInMs="17"/>
      </div>

    );
  }
}

export default ManageSubscriptions;