import React from "react";
import { useState } from "react";
//components
import StatInput from "./StatInput";
//interfaces
import { BattlePokemon } from "../api/data/interfaces";

//default image
let image = 'https://img.icons8.com/fluency/96/null/pokeball.png'

//create context
export const StatContext = React.createContext<any>('');

// slotNum={1} toggleLock={toggleLockSlotN}
export default function TeamSlot({slotNum, toggleLock, pokeObj, signalToUpdate, signalToExport, exportFinal}: any) {
    const [locked, setLocked] = useState<boolean>(false);
    
    //this state is source of truth for if obj has been recieved or is null
    const [pokeObjRecieved, setPokeObjRecieved] = useState<boolean>(() => {
        if (pokeObj){
            return true;
        } else{
            return false;
        }
    });
    const [tempPokeObj, setTempPokeObj] = useState<BattlePokemon | null>(pokeObj);

    React.useEffect(() => {
        //this code will run whenever the "locked" state of this team slot changes
        console.log(`slot ${slotNum} state changed:`, locked);
        console.log('current state of this TeamSlot:', pokeObjRecieved, tempPokeObj, pokeObj);
    }, [locked]);

    React.useEffect(() => {
        //this only runs when a new pokemon is generated for this slot
        //this resets the component and all data in it
        if (signalToUpdate != null) {
          console.log(`this is when team slot ${slotNum} SHOULD re-render from now on`, signalToUpdate);
          setInitialInputValues();
          if (pokeObjRecieved){
            updateInitialPokemonObj();
          }  
          console.log('the initialized team-slot-level pokeObj is currently', tempPokeObj);
        }
      }, [signalToUpdate]);

    React.useEffect(() => {
    //this runs when the user hits the export button
    //it takes the data the user has modified in the team slot and updates root team state
    
    if (signalToExport != null) {
        console.log('this will send the temporaryPokeObj to root state for final export');
        let objToExport: any = JSON.parse(JSON.stringify(tempPokeObj));
        exportFinal(objToExport, slotNum);

    }
    }, [signalToExport]);


    React.useEffect(() => {
        //this will run when the component detects that a pokeObj has been recieved.
        // console.log(`PokeObj has been recieved. Updating state`);
        if (pokeObj){
            updateInitialPokemonObj();
            setPokeObjRecieved(true);
        } else{
            setPokeObjRecieved(false);
        } 
    }, [pokeObjRecieved]);

    React.useEffect(() => {
        //this will check on every component update to see if props have changed.
        //this will update the pokeObjRecieved state if it detects a change
        // console.log('this should run whenever this TeamSlot component updates...does it?');
        if (pokeObj) {
            console.log('useRef triggered');
            setPokeObjRecieved(true);
        } else{
            setPokeObjRecieved(false);
        }
    });

    let slotID: string = `slot${slotNum}`;



    function updateInitialPokemonObj(){
        //take data from prop and create an initialized obj for mutation within component
        let initalPokemonData = new BattlePokemon(`${pokeObj.species}`, `${pokeObj.ability}`, pokeObj.moves, `${pokeObj.nature}`, pokeObj.evSpread, `${pokeObj.item}`, `${pokeObj.teraType}`);
            setTempPokeObj(initalPokemonData);
    }

    function exportModifiedPokeObj(){
        //this function will be called by parent component
        //creates a finalized pokeObj and then sends it to root state to be exported as txt
    }

    //////TODO: grab all values from the inputs and make sure they are accurate/////

    function setInitialInputValues(){
        //this should ONLY run the first time a pokeObj is recieved.
        // console.log('setInitalInputValues was just called. Can you 1.See the species name 2.Modify it 3.See its onchange events logged?');
        
        let slotID = 'slot' + slotNum;
        let thisSlot =  document.getElementById(`${slotID}`);
        //either put a blank or the name as the default value
        let species: string = pokeObj?.species ? pokeObj?.species : '';
        ((thisSlot as HTMLDivElement).querySelector(`#species-${slotNum}`) as HTMLInputElement).value = species;
        let item: string = pokeObj?.item ? pokeObj?.item : '';
        ((thisSlot as HTMLDivElement).querySelector(`#item-${slotNum}`) as HTMLInputElement).value = item;
        let ability: string = pokeObj?.ability ? pokeObj?.ability : '';
        ((thisSlot as HTMLDivElement).querySelector(`#ability-${slotNum}`) as HTMLInputElement).value = ability;
        let nature: string = pokeObj?.nature ? pokeObj?.nature : '';
        ((thisSlot as HTMLDivElement).querySelector(`#nature-${slotNum}`) as HTMLInputElement).value = nature;
        
        let teraType: string = pokeObj?.teraType ? pokeObj?.teraType : '';
        ((thisSlot as HTMLDivElement).querySelector(`#teraType-${slotNum}`) as HTMLInputElement).value = teraType;

        let move0: string = pokeObj?.moves[0] ? pokeObj?.moves[0] : '';
        ((thisSlot as HTMLDivElement).querySelector(`#move-0-${slotNum}`) as HTMLInputElement).value = move0;
        let move1: string = pokeObj?.moves[1] ? pokeObj?.moves[1] : '';
        ((thisSlot as HTMLDivElement).querySelector(`#move-1-${slotNum}`) as HTMLInputElement).value = move1;
        let move2: string = pokeObj?.moves[2] ? pokeObj?.moves[2] : '';
        ((thisSlot as HTMLDivElement).querySelector(`#move-2-${slotNum}`) as HTMLInputElement).value = move2;
        let move3: string = pokeObj?.moves[3] ? pokeObj?.moves[3] : '';
        ((thisSlot as HTMLDivElement).querySelector(`#move-3-${slotNum}`) as HTMLInputElement).value = move3;


    }
    //pokeObj?.species ? ((thisSlot as HTMLDivElement).querySelector('species') as HTMLInputElement).value = pokeObj.species : console.log('null');
    //((thisSlot as HTMLDivElement).querySelector(`#species-${slotNum}`) as HTMLInputElement).value = species;

    function lockThisSlot(){
        toggleLock(slotNum);
        setLocked(!locked);
        console.log(`slot ${slotNum} is locked:`, locked);
    }

    function modifyInitialPokeObjProp(key: string, newValue: string){
        //create a temporary deep copy of our obj
        let temporaryContainerObj: any = JSON.parse(JSON.stringify(tempPokeObj));
        temporaryContainerObj[key] =  newValue;
        console.log('If we were to call the setter function here, the new initial pokeObj state would be this:', temporaryContainerObj);
        setTempPokeObj(temporaryContainerObj);
        
    }

    function modifyInitialPokeObjMoves(key: string, newValue: string, moveSlotIndex: number = 0){
        //create a temporary deep copy of our obj
        let temporaryContainerObj: any = JSON.parse(JSON.stringify(tempPokeObj));
        temporaryContainerObj[key][moveSlotIndex] =  newValue;
        // console.log('this is what we are trying to modify:', temporaryContainerObj);
        // console.log('using this input data:', key, newValue, moveSlotIndex);
        console.log('If we were to call the setter function here, the new initial pokeObj state would be this:', temporaryContainerObj);
        setTempPokeObj(temporaryContainerObj);
    }

    function handleChange(event: any){
        console.log(event.target.value);
        
        //slice off the last 2 characters of the id to make key
        let key = event.target.id.slice(0, -2);
        
        //if it is a move, parse the key additionally
        if (key.includes('move')){
            console.log('TRUE: the key contains move', key);
            //parse the word move and the move array index to seperate variables
            let parsedMoveNumber: number = key.slice(-1);
            let parsedKey: string = (key.slice(0,4) + 's');
            console.log('parsing produces:', parsedMoveNumber, parsedKey);
            modifyInitialPokeObjMoves(parsedKey, event.target.value, parsedMoveNumber);
        } else{
            console.log('FALSE: the key is NOT a move', key);
            modifyInitialPokeObjProp(key, event.target.value);
        }

        //
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
      <div id="image-and-name" className="flex w-full h-56  justify-center ">
        <figure className="w-1/2">
            <img
            src={image}
            alt="Pokemon Image"
            className="rounded-xl h-48 w-48"
            />
        </figure>
        <div className="flex-col w-1/2 mt-3 overflow-hidden">
            <input id={`species-${slotNum}`} onChange={handleChange} type="text" placeholder="Species" className="input input-bordered w-44 h-10 mx-0 my-1 font-extrabold" />
            <input id={`item-${slotNum}`} onChange={handleChange} type="text" placeholder="Item" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input id={`ability-${slotNum}`} onChange={handleChange} type="text" placeholder="Ability" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input id={`nature-${slotNum}`} onChange={handleChange} type="text" placeholder="Nature" className="input input-bordered w-44 h-8 mx-0 my-1" />
            <input id={`teraType-${slotNum}`} onChange={handleChange} type="text" placeholder="Tera Type" className="input input-bordered w-44 h-8 mx-0 my-1" />
        </div>
      </div>
{/* value={pokeObj?.species ? pokeObj!.species : null} */}

      <div id="move-container" className="move-container">
        <input id={`move-0-${slotNum}`} onChange={handleChange} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input id={`move-1-${slotNum}`} onChange={handleChange} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input id={`move-2-${slotNum}`} onChange={handleChange} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
        <input id={`move-3-${slotNum}`} onChange={handleChange} type="text" placeholder="-" className="input input-bordered w-44 h-8 mx-0 my-1" />
      </div>

      <StatContext.Provider value={{tempPokeObj, setTempPokeObj}}>
          <div id="stat-container" className="stat-container">
            <StatInput stat="HP" statValue={9} slotNum={slotNum} />
            <StatInput stat="Atk" statValue={pokeObj?.evSpread.Atk} slotNum={slotNum} />
            <StatInput stat="Def" statValue={pokeObj?.evSpread.Def} slotNum={slotNum} />
            <StatInput stat="SpA"  statValue={pokeObj?.evSpread.SpA} slotNum={slotNum}/>
            <StatInput stat="SpD" statValue={pokeObj?.evSpread.SpD} slotNum={slotNum} />
            <StatInput stat="Spe" statValue={pokeObj?.evSpread.Spe} slotNum={slotNum} />
          </div>
      </StatContext.Provider>
    </div>
  );
}

