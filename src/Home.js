import React, { Component } from 'react';
import DisplaySubscriptions from './Subscriptions/DisplaySubscriptions';
import DisplayListings from './Listings/DisplayListings';
import Pagination from './utilities/Pagination';
import axios from 'axios';

const SUBSCRIPTIONS_LIST = 'subscriptionslist';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			listings: [],
			subscriptions:[],
			before: '',
			after: '',
			count: 0
		}
		this.getSubscriptions.bind(this);
		this.getListings.bind(this);
		this.getData.bind(this);
		this.refreshListings.bind(this);
		//to be deleted - added just for testing
		window.localStorage.setItem(SUBSCRIPTIONS_LIST, JSON.stringify(['worldnews', 'funny']));
	}

	componentDidMount(){
		this.getData('', '' );
	}

	getData(before, after, type, transactionType){
		const subscriptions = this.getSubscriptions();
		this.getListings(before, after, type, transactionType, subscriptions);
	}

	getSubscriptions(){
		let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
		if(subscriptions){
			subscriptions = JSON.parse(subscriptions);
			this.setState({subscriptions});
		}
		return subscriptions;
	}

	getListings(before, after, type='add', transactionType='continue', subscriptions){
		let url;
		let count;
		if(transactionType === 'refresh'){
  		count = 0;
  	}else{
  		count = this.state.count;
  	}
		const path = subscriptions.length > 0 ? subscriptions.join('+'): 'news';

		if(count === 0){
			url = `https://www.reddit.com/r/${path}.json`;
		}else if(after !== ''){
			url = `https://www.reddit.com/r/${path}.json?count=${count}&after=${after}`;
		}else if(before !== ''){
			url = `https://www.reddit.com/r/${path}.json?count=${count}&before=${before}`;
		}else{
			console.log('Error with getListings params');
		}

		axios.get(url)
		.then(results => {
			const after = results.data.data.after === null? '': results.data.data.after;
  		const before = results.data.data.before === null? '': results.data.data.before;
  		const addCount = type === 'add' ? 25 : -25;
			this.setState({
				listings: results.data.data.children, after, before, 
				count: count + addCount
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	refreshListings(){
		this.getData();
	}
	render() {
		const {listings, before, after, count} = this.state;
    return (
      <div className="home">
      	<Pagination 
		        before={before} 
		        after={after} 
		        count={count}
		        callback={this.getData.bind(this)}/>
      	<DisplayListings listings={listings} />
      	<Pagination 
		        before={before} 
		        after={after} 
		        count={count}
		        callback={this.getData.bind(this)}/>
	      <DisplaySubscriptions 
	      displayManageSubscription={true}
	      refreshListings={this.refreshListings.bind(this)}/>
      </div>

    );
  }
}

export default Home;