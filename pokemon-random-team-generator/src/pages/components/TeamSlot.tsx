import React from "react";
import { useState } from "react";
//components
import StatInput from "./StatInput";
//interfaces
import { BattlePokemon } from "../api/data/interfaces";

//default image
let image = 'https://img.icons8.com/fluency/96/null/pokeball.png'

// slotNum={1} toggleLock={toggleLockSlotN}
export default function TeamSlot({slotNum, toggleLock, pokeObj}: any) {
    const [locked, setLocked] = useState<boolean>(false);
    const [modifedPoke, setModifiedPoke] = useState<BattlePokemon | null>(null);
    //this state is source of truth for if obj has been recieved or is null
    const [pokeObjRecieved, setPokeObjRecieved] = useState<boolean>(() => {
        if (pokeObj){
            return true;
        } else{
            return false;
        }
    });
    const [ipokeObj, setIpokeObj] = useState<BattlePokemon | null>(pokeObj);
    //useRef() detects when a prop has changed
    const prevPropsRef = React.useRef(); 

    React.useEffect(() => {
        //this code will run whenever the "locked" state of this team slot changes
        console.log(`slot ${slotNum} state changed:`, locked);
        console.log('current state of this TeamSlot:', modifedPoke, pokeObjRecieved, ipokeObj);
    }, [locked]);

    React.useEffect(() => {
        //this will run when the component detects that a pokeObj has been recieved.
        // console.log(`PokeObj has been recieved. Updating state`);
        if (pokeObj){
            if (pokeObj !== prevPropsRef.current){
                let initalPokemonData = new BattlePokemon(`${pokeObj.species}`, `${pokeObj.ability}`, pokeObj.moves, `${pokeObj.nature}`, pokeObj.evSpread, `${pokeObj.item}`, `${pokeObj.teraType}`);
                setIpokeObj(initalPokemonData);

            }
            // setInitialInputValues();
            setPokeObjRecieved(true);
        } else{
            setPokeObjRecieved(false);
        } 
    }, [pokeObjRecieved]);

    React.useEffect(() => {
        //this will check on every component update to see if props have changed.
        //this will update the pokeObjRecieved state if it detects a change
        // console.log('this should run whenever this TeamSlot component updates...does it?');
        if (pokeObj !== prevPropsRef.current) {
            if (pokeObj){
                setInitialInputValues();
                setPokeObjRecieved(true);
            } else{
                setPokeObjRecieved(false);
            }
        } else{
            console.log('looks like no change occured to the Ref')
        }
    });

    let slotID: string = `slot${slotNum}`;
    let speciesID: string = `species-${slotNum}`

    function modifyStagedPokeObj(){
        //update the modifedPoke with data from component inputs
        // let newStagedPoke = new BattlePokemon(`${monSet.species}`, `${monSet.ability}`, monSet.moves, `${monSet.nature}`, monSet.evSpread, `${monSet.item}`, `${monSet.teraType}`);

        console.log()
    }

    function exportModifiedPokeObj(){
        //this function will be called by parent component
        //creates a finalized pokeObj and then sends it to root state to be exported as txt
    }

    function setInitialInputValues(){
        //this should ONLY run the first time a pokeObj is recieved.
        console.log('setInitalInputValues was just called. Can you 1.See the species name 2.Modify it 3.See its onchange events logged?');
        
        let slotID = 'slot' + slotNum;
        let thisSlot =  document.getElementById(`${slotID}`);
        //either put a blank or the name as the default value
        let species: string = pokeObj.species ? pokeObj?.species : '';
        ((thisSlot as HTMLDivElement).querySelector('#species') as HTMLInputElement).value = species;
        

    }
    //pokeObj?.species ? ((thisSlot as HTMLDivElement).querySelector('species') as HTMLInputElement).value = pokeObj.species : console.log('null');
    //((thisSlot as HTMLDivElement).querySelector(`#species-${slotNum}`) as HTMLInputElement).value = species;

    function lockThisSlot(){
        toggleLock(slotNum);
        setLocked(!locked);
        console.log(`slot ${slotNum} is locked:`, locked);
    }

    function handleChange(event: any){
        console.log(event.target.value);
    }

  return (
    <div id={slotID} className="card w-96 bg-base-100 shadow-xl flex-col items-center ">
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
            <input id='species' onChange={handleChange} type="text" placeholder="Species" className="input input-bordered w-44 h-10 mx-0 my-1 font-extrabold" />
            <input value={ipokeObj?.item ? pokeObj!.item : null} type="text" placeholder="Item" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input value={pokeObj?.ability ? pokeObj!.ability : null} type="text" placeholder="Ability" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input value={pokeObj?.nature ? pokeObj!.nature : null} type="text" placeholder="Nature" className="input input-bordered w-44 h-8 mx-0 my-1" />
        </div>
      </div>
{/* value={pokeObj?.species ? pokeObj!.species : null} */}

      <div id="move-container" className="move-container">
        <input value={pokeObj?.moves ? pokeObj!.moves[0] : null} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input value={pokeObj?.moves ? pokeObj!.moves[1] : null} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input value={pokeObj?.moves ? pokeObj!.moves[2] : null} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input value={pokeObj?.moves ? pokeObj!.moves[3] : null} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
      </div>

      <div id="stat-container" className="stat-container">
        <StatInput stat="HP" statValue={pokeObj?.evSpread.HP} />
        <StatInput stat="Atk" statValue={pokeObj?.evSpread.Atk} />
        <StatInput stat="Def" statValue={pokeObj?.evSpread.Def} />
        <StatInput stat="SpA"  statValue={pokeObj?.evSpread.SpA}/>
        <StatInput stat="SpD" statValue={pokeObj?.evSpread.SpD} />
        <StatInput stat="Spe" statValue={pokeObj?.evSpread.Spe} />
      </div>
    </div>
  );
}
