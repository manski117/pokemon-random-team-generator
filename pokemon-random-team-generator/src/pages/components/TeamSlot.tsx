import React from "react";
import { useState } from "react";
//components
import StatInput from "./StatInput";

//default image
let image = 'https://img.icons8.com/fluency/96/null/pokeball.png'

// slotNum={1} toggleLock={toggleLockSlotN}
export default function TeamSlot({slotNum, toggleLock}: any) {
    const [locked, setLocked] = useState<boolean>(false);

    React.useEffect(() => {
        console.log(`slot ${slotNum} state changed:`, locked);
    }, [locked]);


    function lockThisSlot(){
        toggleLock(slotNum);
        setLocked(!locked);
        console.log(`slot ${slotNum} is locked:`, locked);
    }

    //TODO: allow random functionality

    //TODO: check against other pokemon

    //TODO: finish layout

    

  return (
    <div className="card w-96 bg-base-100 shadow-xl flex-col items-center ">
      <div className="flex justify-between items-center w-11/12 ">
          <h3 className="pancakes-text text-4xl  w-10 rounded-full" >{slotNum}</h3>
          <label className="swap">
            <input type="checkbox" />
            <img onClick={lockThisSlot} src="https://img.icons8.com/ios/50/null/lock--v1.png" alt="" className="swap-on rounded-lg bg-neutral-content p-1 h-12 w-12 mt-2 mx-auto" />
            <img onClick={lockThisSlot} src="https://img.icons8.com/ios/50/null/unlock.png" alt="" className="swap-off rounded-lg bg-neutral-content p-1 h-12 w-12 mt-2 mx-auto" />
          </label>
      </div>
      <div id="image-and-name" className="flex w-full h-48  justify-center ">
        <figure className="w-1/2">
            <img
            src={image}
            alt="Pokemon Image"
            className="rounded-xl h-40 w-40"
            />
        </figure>
        <div className="flex-col w-1/2 mt-3 overflow-hidden">
            <input type="text" placeholder="Species" className="input input-bordered w-44 h-10 mx-0 my-1 font-extrabold" />
            <input type="text" placeholder="Item" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input type="text" placeholder="Ability" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input type="text" placeholder="Nature" className="input input-bordered w-44 h-8 mx-0 my-1" />
        </div>
      </div>


      <div id="move-container" className="move-container">
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
      </div>

      <div id="stat-container" className="stat-container">
        <StatInput />
        <StatInput />
        <StatInput />
        <StatInput />
        <StatInput />
        <StatInput />
      </div>
    </div>
  );
}
