import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SlotMachine from './components/SlotMachine';
import ScrollingMarquee from './components/ScrollingMarquee';



const App = () => (
  <div className="App">
    <SlotMachine />
    <ScrollingMarquee />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
