import './App.css';
import SlideOver from './components/SlideOver';
import Map from './components/Map';
import Menu from './components/Menu';

function App() {
  return (
    <div className="">
      <div className="h-10 w-screen flex justify-center items-center border-solid border-black border-4 box-border">
        <div className="text-4xl font-bold p-2">ECOLYZER</div>
        <div><Menu/></div>
      </div>
      <div className="h-85 w-screen-6 m-3 flex border-solid rounded-lg border-black border-4 box-border">
        <div className="h-full w-2/3 bg-slate-400"><Map/></div>
        <div className="h-full w-1/3 bg-slate-800"><SlideOver/></div>
        
      </div>
    </div>
  );
}

export default App;
