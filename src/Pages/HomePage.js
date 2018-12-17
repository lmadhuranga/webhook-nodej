import React, { Component } from 'react';
import WebPush from '../components/WebPush';
import { connect } from 'react-redux';
import {payloadFromSubscription} from '../Utility/Utility';
import { updateSubscribe } from '../actions/webPushActions';

const applicationServerPublicKey = "BDpN09_DLr0JD5LjfrGfH5oez7QJ20dZNawPc3JEnl7Hl4FSid-wszGrCQJz7e2i2u3B59xlHP4hGjK1wHRQuaQ";
class HomePage extends Component {
  constructor(){
    super();
    this.state = { 
      user:{},
      userId:'',
      subscriveUserEnabled: false,
      subscription: {endpoint: ''},
    }

    this.onWebPushToggle = this.onWebPushToggle.bind(this)
    this.onUpdateSubscriptionOnServer = this.onUpdateSubscriptionOnServer.bind(this)
    this.onSubscriptionFailed = this.onSubscriptionFailed.bind(this)
  }

  onWebPushToggle() {
    this.setState({
      subscriveUserEnabled: !this.state.subscriveUserEnabled,
    })
  }

  onUpdateSubscriptionOnServer(subscription) {
    console.log("onUpdateSubscriptionOnServer:", subscription)
    var payload = payloadFromSubscription(subscription)
    console.log("payload:", JSON.stringify(payload))
    this.setState({subscription: subscription})
    updateSubscribe(JSON.stringify(payload));
  }

  onSubscriptionFailed(error) {
    console.log("onSubscriptionFailed:", error)
  }

  render() {
    return <div>
      <h1>Home page</h1>
      <WebPush
              subscriveUserEnabled={this.state.subscriveUserEnabled}
              applicationServerPublicKey={applicationServerPublicKey}
              onSubscriptionFailed={this.onSubscriptionFailed}
              onUpdateSubscriptionOnServer={this.onUpdateSubscriptionOnServer}
            />
            <button onClick={()=> {this.onWebPushToggle()}}>Web push</button>
    </div>
  }
}

// PostPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  post: state.posts.item
})
export default connect( mapStateToprops, { updateSubscribe })(HomePage);