import React from "react";
import { useState } from "react";

let image = 'https://img.icons8.com/fluency/96/null/pokeball.png'


export default function TeamSlot() {
    //TODO: make state

    //TODO: allow random functionality

    //TODO: check against other pokemon

    //TODO: finish layout

  return (
    <div className="card w-96 bg-base-100 shadow-xl flex-col items-center">
      <button className="btn my-5 mx-auto w-10">lock</button>
      <div id="image-and-name" className="flex w-full h-48 border border-white justify-center ">
        <figure className="w-1/2">
            <img
            src={image}
            alt="Pokemon Image"
            className="rounded-xl h-40 w-40 border border-white"
            />
        </figure>
        <div className="flex-col w-1/2 mt-3 overflow-hidden">
            <input type="text" placeholder="Species" className="input input-bordered w-44 h-10 mx-0 my-1 font-extrabold" />
            <input type="text" placeholder="Item" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input type="text" placeholder="Ability" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input type="text" placeholder="Nature" className="input input-bordered w-44 h-8 mx-0 my-1" />
        </div>
      </div>


      <div id="move-container" className="grid-cols-2 grid-rows-2 my-5 ml-4">
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
      </div>

      <div id="stat-container" className="grid-cols-2 grid-rows-3 my-5 ml-4">
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
      </div>
    </div>
  );
}
