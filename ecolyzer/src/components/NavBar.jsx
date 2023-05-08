import React from 'react'
import { BiMenu } from "react-icons/bi";

export default function NavBar() {
    const [showMenu, setShowMenu] = React.useState(false)

    return (
        <div>
            <div className="top-0 mb-1 w-screen h-32 flex justify-between items-center box-border text-5xl text-green-800 fixed bg-white z-10">
                <div className="h-fit flex justify-start items-center">
                    <div className="h-full font-josefin ml-5 p-2 pt-5 bg-green-800 rounded-2xl text-white text-5xl sm:text-6xl tracking-wide">ECOLYZER</div>
                </div>
                <ul className="font-josefin h-fit mr-5 hidden md:flex justify-evenly">
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4"><a href='/map'>Map</a></li>
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4 md:"><a href='/about'>About</a></li>
                </ul>
                <div className="h-fit mr-5 md:hidden flex items-center hover:scale-90 transition-all h-12 duration-500 hover:cursor-pointer" onClick={() => {setShowMenu(true)}} >
                    <BiMenu size={80} />
                </div>
            </div>
            <div className='bg-white fixed' style={{ width: showMenu ? "flex" : "hidden" }}>
                <ul className="font-josefin h-fit mr-5">
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4" onClick={() => {setShowMenu(false)}}><a href='/map'>Map</a></li>
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4 md:"  onClick={() => {setShowMenu(false)}}><a href='/about'>About</a></li>
                </ul>
            </div>
        </div>
    )
}
