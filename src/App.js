'use strict';
var React = require('react');


var  App = React.createClass({ 
  
  getInitialState(){
    return {containers: (new Array(10).fill('available'))};
  },



  render() {


    var containers = this.state.containers;
    var elements = containers.map(function (st, num) {
      return <div key={num}>{num}</div>
    });

    return (
      <div>
      {elements}
      </div>
      
    );
  }

});
