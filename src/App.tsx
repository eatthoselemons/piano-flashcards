import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick={playNote(Note(4,1))}>A</button>
      <button onClick={playNote(Note(4,2))}>B</button>
      <button onClick={playNote(Note(5,3))}>high C</button>
    </div>
  );
}

export default App;
