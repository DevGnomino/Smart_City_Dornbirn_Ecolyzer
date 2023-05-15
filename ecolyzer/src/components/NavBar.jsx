import React, { useState } from 'react'
import { BiMenu, BiX } from "react-icons/bi";

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <div className="top-0 mb-1 w-screen h-32 flex justify-between items-center box-border text-5xl text-green-800 fixed bg-white z-10">
                <div className="h-fit flex justify-start items-center">
                    <div className="h-full font-josefin ml-5 p-2 pt-5 bg-green-800 rounded-2xl text-white text-5xl sm:text-6xl tracking-wide">ECOLYZER</div>
                </div>
                <ul className="font-josefin h-fit mr-5 hidden md:flex justify-evenly">
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4"><a href='/map'>Map</a></li>
                    <li className="hover:scale-90 transition-all h-12 duration-500 m-4"><a href='/about'>About</a></li>
                </ul>
                <div className="h-fit mr-5 md:hidden flex items-center hover:scale-90 transition-all duration-500 hover:cursor-pointer" onClick={() => { setShowMenu(!showMenu) }} >
                    {showMenu ? <BiX size={80} /> : <BiMenu size={80} />}
                </div>
            </div>
            <div className='top-32 h-5/6 overflow-hidden w-screen bg-white text-green-800 z-20 fixed justify-center flex align-middle transition-all duration-700' style={{ height: showMenu ? "100%" : "0%" }}>
                <ul className="font-josefin text-4xl my-40 w-32 h-32 text-center">
                    <li className="hover:scale-90 transition-all duration-500 py-4" onClick={() => { setShowMenu(false) }}><a href='/map'>Map</a></li>
                    <li className="hover:scale-90 transition-all duration-500 py-4" onClick={() => { setShowMenu(false) }}><a href='/about'>About</a></li>
                </ul>
            </div>
        </div>
    )
}
