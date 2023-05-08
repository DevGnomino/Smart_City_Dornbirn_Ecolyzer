import { Component } from 'react';
import './App.css';
import Map from './components/Map';
import NavBar from './components/NavBar';
import About from './components/About';

function App() {
  let Component;
  switch (window.location.pathname) {
    case '/map':
      Component = Map;
      break;
    case '/about':
      Component = About;
      break;
    default: Component = Map;
      break;
  }

  return (
    <div className="h-screen w-screen leading-none select-none">
      <NavBar/>
      <Component/>
    </div>
  );
}

export default App;
