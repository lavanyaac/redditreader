import React, { Component } from 'react';

class MoveToTop extends Component {
  constructor(){
    super();
    this.state = {
      intervalId: 0
    }
  }

  scrollStep(){
    if(window.pageYOffset === 0){
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  scrollToTop(){
    const intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({intervalId});
  }
  render() {
    return (
      <button 
      className="move-to-btn"
      onClick={()=>{this.scrollToTop();}}>Top</button>
    );
  }
}

export default MoveToTop;
