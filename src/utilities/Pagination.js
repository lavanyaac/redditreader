import React, { Component } from 'react';

class Pagination extends Component {
  render() {
  	const {before, after, count, callback} = this.props;
    return (
      <div className="pagination">
        <button 
        className={ "prevbtn pgbtn "+ (count > 26 ? "" : "inactive")}
        onClick={() => {callback(before, '', 'sub')}}>
        Prev</button>
        <button 
        className={ "nextbtn pgbtn "+ (after ? "" : "inactive")}
        onClick={() => {callback('', after)}}>
        Next</button>
      </div>
    );
  }
}

export default Pagination;
