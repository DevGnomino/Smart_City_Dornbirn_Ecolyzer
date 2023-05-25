import { Component } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import NavBar from './components/NavBar';
import About from './components/About';

function App() {
  let Component;
  switch (window.location.pathname) {
    case '/map':
      Component = MapComponent;
      break;
    case '/about':
      Component = About;
      break;
    default: Component = MapComponent;
      break;
  }

  return (
    <div className="h-screen w-screen leading-none select-none z-10">
      <NavBar/>
      <Component/>
    </div>
  );
}

export default App;
