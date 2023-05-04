import React from 'react'

export default function NavBar() {
    return (
        <div className="w-screen h-1/6 flex justify-between items-center box-border text-5xl">
            <div className="h-fit flex justify-start items-center">
                <div className="h-full font-josefin ml-5 p-2 pt-5 bg-green-800 rounded-2xl text-white text-6xl tracking-wide">ECOLYZER</div>
            </div>
            <ul className="font-josefin h-16 mr-5 flex justify-evenly">
                <li className="hover:scale-90 transition-all h-12 duration-500 m-4"><a href='/map'>Map</a></li>
                <li className="hover:scale-90 transition-all h-12 duration-500 m-4"><a href='/about'>About</a></li>
            </ul>
        </div>
    )
}
