'use strict';



var React = require('react');

var  App = React.createClass({
  getInitialState() {
      return {containers: (new Array(10).fill('available')), whoTurn: 'user'};
    },

  getSelectedCount(containers) {
    return containers.filter(st => st === 'selected').length;
  },

    onContainerClick (e) {
      if (this.state.whoTurn !== 'user') {
        return;
      }

      var num = parseInt(e.target.innerHTML, 10);
      var containers = this.state.containers;
      
      var st = containers[num];
      
      if(st === 'removed') {
        return;
      };

      var newSt = st === 'available' ? 'selected' : 'available';
      
      
      
      
      if (newSt === 'selected' && this.getSelectedCount(containers) === 3) {
        
        return;
      }
      containers[num] = newSt;
      
      this.setState({containers: containers});

      
    },

    onButtonClick() {
      if (this.state.whoTurn !== 'user') {
        return;
      }
      var containers = this.state.containers;
      var selectedCount = this.getSelectedCount(containers);
      if(selectedCount === 0 ) {
        alert('выберете от одного до трех контейнеров');
        return;
      }

      containers = containers.map(st => st === 'selected' ? 'removed' : st);
      if (this.isGameEnded(containers)) {
        this.setState({whoTurn: null});
        alert('Игра окончена. Вы выиграли!');
      } else {
        this.setState({containers: containers, whoTurn: 'computer'}, this.makeComputerTurn);
      }
    },

    isGameEnded(containers) {
      return containers.every(st => st === 'removed');
    },

    makeComputerTurn () {
      var containers = this.state.containers;
      var availableCount = containers.filter(st => st === 'available').length;
      var toSelectCount = availableCount % 4;
        if(toSelectCount === 0) {
          toSelectCount = Math.floor(Math.random()*3+1);
        }

        for ( var i = 0; i < containers.length; i++) {
          if(containers[i] === 'available') {
            containers[i] = 'selected';
            toSelectCount --;
            if(toSelectCount === 0) {
              break;
            }
          }
        }

      this.setState({containers:containers});
      
      setTimeout(() => {

        containers = containers.map(st => st === 'selected' ? 'removed' : st);
        if (this.isGameEnded(containers)) {
          this.setState({whoTurn: null});
          alert('Игра окончена. Вы проиграли!');
        } else {

          this.setState({containers: containers, whoTurn: 'user'});
        }
      

      }, 1000);

      },  
    

  render() {
    var containers = this.state.containers;
    var elements = containers.map((st, num) => {
      var className = 'cont ' + st
      return <div key={num} className={className} onClick={this.onContainerClick}>{num}</div>

    })
    

    return (

      <div>
        {elements}
        <div style={{clear: 'left'}}></div>
        <button onClick={this.onButtonClick}><h2>Вывезти выбранные контейнеры</h2></button>
      </div>
    );
  }
});

module.exports = App; 