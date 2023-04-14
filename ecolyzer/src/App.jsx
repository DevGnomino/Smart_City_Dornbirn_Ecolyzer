import './App.css';
import SlideOver from './components/SlideOver';
import Map from './components/Map';

function App() {
  return (
    <div className="h-screen w-screen box-border">
      <div className="w-screen h-1/6 flex justify-center items-center border-solid border-black border-4 box-border">
        <div className="text-4xl font-bold p-2">ECOLYZER</div>
      </div>
      <div className="w-screen h-5/6 flex p-5 overflow-hidden">
        <div className="w-full h-auto overflow-hidden border-solid border-4 border-black rounded-2xl bg-blue box-border"><Map/></div>
        <div className="bg-slate-800 box-border"><SlideOver/></div>
      </div>
    </div>
  );
}

export default App;
