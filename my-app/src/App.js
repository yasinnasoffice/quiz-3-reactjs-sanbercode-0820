//soal nomor 1


import React from 'react';
import logo from './logo.svg';
// import logo from './logo.svg';
import './App.css';
// import FormBuah from './Tugas-9/FormBuah';
// import DaftarBuah from './Tugas-10/DaftarBuah';
// import Timer from './Tugas-11/Timer'
// import DaftarBuah from './Tugas-12/DaftarBuah'
import DaftarBuah from './QUIZ3/DaftarBuah';
import { Switch, Route } from "react-router";
import Routes from './QUIZ3/Routes';
import About from './QUIZ3/About';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <>
      
     
    </>
      </header> */}
      {/* <FormBuah/> */}
      {/* <DaftarBuah/> */}

      <Routes />
      <DaftarBuah />
      <About />
{/*       
      <Timer start={5}/> */}
    </div>
  
    
  );
}

export default App;

