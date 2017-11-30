import React, { Component } from 'react';
import Subscription from './Subscription';
import { withRouter } from 'react-router-dom';
const SUBSCRIPTIONS_LIST = 'subscriptionslist';


class DisplaySubscriptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      subscriptions:[]
    }
    this.getSubscriptionList.bind(this);
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
    this.props.history.push('/managesubscriptions');
  }
	render() {
		const {subscriptions} = this.state;
    const { displayManageSubscription } = this.props;
    
    const manageSubscription = displayManageSubscription ? 
    <button onClick={this.handleManageSubsriptionsClick.bind(this)}>Manage Subscriptions</button> :
    null;

    const subscriptionsList = subscriptions.length === 0 ?
        <div>
          <p>Click on Edit Subscription button to Subscribe to a reddit</p>
        </div>
       :<ul>
          {
            subscriptions.map((subscription, i) => (
              <Subscription subscription={subscription} key={i} index={i}/>
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