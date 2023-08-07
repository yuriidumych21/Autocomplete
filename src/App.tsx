import React from 'react';
import AutoComplete from './components/AutoComplete/index.tsx';
import './App.css';

function App() {
  const suggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Grapes',
    'Orange',
    'Peach',
    'Pear',
  ];

  return (
    <div className='app'>
      <h1>Auto-Complete Component</h1>
      <AutoComplete suggestions={suggestions} />
    </div>
  );
}

export default App;
