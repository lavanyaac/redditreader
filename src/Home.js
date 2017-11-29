import React, { Component } from 'react';
import DisplaySubscriptions from './Subscriptions/DisplaySubscriptions';
import DisplayListings from './Listings/DisplayListings';
import axios from 'axios';

const SUBSCRIPTIONS_LIST = 'subscriptionslist';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			listings: [],
			subscriptions:[]
		}
		this.getSubscriptions.bind(this);
		this.getListings.bind(this);
		//to be deleted - added just for testing
		window.localStorage.setItem(SUBSCRIPTIONS_LIST, JSON.stringify(['worldnews', 'funny']));
	}
	componentDidMount(){
		const subscriptions = this.getSubscriptions();
		this.getListings(subscriptions);
	}
	getSubscriptions(){
		let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
		if(subscriptions){
			subscriptions = JSON.parse(subscriptions);
			this.setState({subscriptions});
		}
		return subscriptions;
	}
	getListings(subscriptions=this.state.subscriptions){
		const url = 'https://www.reddit.com/r/';
		// const {subscriptions} = this.state;

		console.log('*******subscriptions', subscriptions)
		const path = subscriptions.length > 0 ? subscriptions.join('+'): 'news';
		axios.get(`${url}${path}.json`)
		.then(results => {
			this.setState({listings: results.data.data.children});
		})
		.catch(error => {
			console.log(error);
		});
	}
	render() {
		const {subscriptions, listings} = this.state;
		console.log('state', this.state, listings);
    return (
      <div className="home">
      	<DisplayListings listings={listings} />
	      <DisplaySubscriptions subscriptions={subscriptions}/>
      </div>

    );
  }
}

export default Home;