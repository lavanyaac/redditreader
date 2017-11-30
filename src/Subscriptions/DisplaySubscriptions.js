import React, { Component } from 'react';
import Subscription from './Subscription';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
const SUBSCRIPTIONS_LIST = 'subscriptionslist';


class DisplaySubscriptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      subscriptions:[]
    }
    this.getSubscriptionList.bind(this);
    this.handleUnsubscribeClick.bind(this);

  }

  componentDidMount(){
    this.getSubscriptionList();
  }

  getSubscriptionList(){
    let subscriptions = window.localStorage.getItem(SUBSCRIPTIONS_LIST);
    if(subscriptions){
      subscriptions = JSON.parse(subscriptions);
      this.setState({subscriptions});
    }
    return subscriptions;
  }

  handleManageSubscriptionsClick(){
    console.log("hellooooooo", this)
    this.props.history.push('/managesubscriptions');
  }

  handleUnsubscribeClick(subscriptionIndex, subreddit){
    const updatedList = update(this.state.subscriptions, {
        $splice:[[subscriptionIndex, 1]]
      });
    this.setState({
      subscriptions: updatedList
    });
    window.localStorage.setItem(SUBSCRIPTIONS_LIST, JSON.stringify(updatedList));
    if(this.props.refreshListings){
        this.props.refreshListings();
    }
  }

  render() {
    const {subscriptions} = this.state;
    const { displayManageSubscription } = this.props;
    
    const manageSubscription = displayManageSubscription ? 
    <button onClick={this.handleManageSubscriptionsClick.bind(this)}>Manage Subscriptions</button> :
    null;

    const subscriptionsList = subscriptions.length === 0 ?
        <div>
          <p>Click on Edit Subscription button to Subscribe to a reddit</p>
        </div>
       :<ul>
          {
            subscriptions.map((subscription, i) => (
              <Subscription 
              subscription={subscription} 
              key={i} 
              subscriptionIndex={i}
              handleUnsubscribeClick={this.handleUnsubscribeClick.bind(this)}/>
            ))
          }
        </ul>
    return (
      <aside className="subscriptions-container">
        <h2> Subscriptions List </h2>
        { subscriptionsList }
        { manageSubscription }
      </aside>

    );
  }
}

export default withRouter(DisplaySubscriptions);