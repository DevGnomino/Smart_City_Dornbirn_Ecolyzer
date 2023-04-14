import './App.css';
import SlideOver from './components/SlideOver';
import Map from './components/Map';

function App() {
  return (
    <div className="h-screen w-screen box-border text-green-800 leading-none select-none">
      <div className="w-screen h-1/6 flex justify-evenly items-center box-border text-5xl">
        <div className="w-3/4 h-fit flex justify-start flex items-center">
        <div className="h-full font-josefin ml-5 p-2 pt-5 bg-green-800 rounded-2xl text-white text-6xl tracking-wide">ECOLYZER</div>
        </div>
        <div className="font-josefin w-1/4 flex justify-evenly ">
          <div className="hover:scale-90 transition-all duration-500">Map</div>
          <div className="hover:scale-90 transition-all duration-500">About</div>
        </div>
      </div>
      <div className="w-screen h-5/6 flex p-5 pt-0 overflow-hidden">
        <div className="w-full h-auto overflow-hidden border-solid border-4 border-green-800 rounded-2xl bg-blue box-border"><Map /></div>
        <div className="bg-slate-800 box-border"><SlideOver /></div>
      </div>
    </div>
  );
}

export default App;
