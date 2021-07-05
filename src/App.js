import React from 'react';
import logo from './logo.svg';
import './App.css';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = [ '/', '*', '-', '+'];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }
  
  
  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;
    
    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0',
        });
        break;
      }
        
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
        
      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        
        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.'
          })
        }
        
        break;
      }
        
      default: {
        let e = undefined;
        // check for other operators
        if(ops.includes(innerText)) {
          if(ops.includes(lastPressed) && innerText !== '-') {
            // HECTIC...
            const lastNumberIdx = calc.split('').reverse()
                .findIndex(char => char !== ' ' && nums.includes(+char)); 
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }
        
        this.setState({
          calc: e
        });
      }
    }
    
    this.setState({
      lastPressed: innerText
    })
    
  }
  
  render() {
    const { currentNumber, calc } = this.state;
    
    return (
      <div className="calculator">   
        <div id="display" className="display">
          <small></small>
          {calc}
        </div>
        
        <div className="nums-container">
          <button 
            className="big-h light-grey ac" 
            onClick={this.handleClick} 
            id="clear"
            >
            AC
          </button>
          
          {nums.map(num => (
            <button 
              className={`dark-grey ${num === 0 && 'big-h'}`} 
              key={num} 
              onClick={this.handleClick}
              id={ids[num]}
             >
              {num}
            </button>
          ))}
          
          <button 
            className="light-grey" 
            onClick={this.handleClick} 
            id="decimal"
           >
            .
          </button>
        </div>
        <div className="ops-container">
          {ops.map(op => (
            <button 
              className="orange" 
              key={op} 
              onClick={this.handleClick}
              id={ids[op]}
             >
              {op}
            </button>
          ))}
          
          <button 
            className="orange" 
            onClick={this.handleClick} 
            id="equals"
           >
            =
          </button>
        </div>
      </div>
    )
  }
}


export default App;
