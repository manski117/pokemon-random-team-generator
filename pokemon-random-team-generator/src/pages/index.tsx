import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

//import functions
import { getRandomPokemon } from "./api/functions/random";
//import data
import { RandomSetsSV } from "./api/data/randomSetsSV";
//interfaces
import { BattlePokemon, PokeSets, Team, LockMatrix, EVspread } from "./api/data/interfaces";

//components
import TeamSlot from "./components/TeamSlot";

//TODO TOMORROW:
/*
Main issue X: My edits in Team Slot components work just fine and are saved on the tempObj in their state.
The problem is that I'm trying to get those changes to show up on my export
Way I'm trying to solve this issueY: setState is asynch so I can only update the team state once the 
data from ALL components has been passed to this one. I'm currently putting them in a little container that 
is called stagedTeam. The main problem is that for some reason, even though stagedTeam is being changed,
those changes are somehow gone when they get to the updateTeam call.
*/



const Home: NextPage = () => {
  const [teamData, setTeamData] = React.useState<string>('');
  const [lockedSlots, setLockedSlots] = React.useState<LockMatrix>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [team, setTeam] = React.useState<Team>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });
  //use for signal to update teamslot
  const [signalToUpdateTeamSlot, setSignalToUpdateTeamSlot] = React.useState(Date.now());
  const [signalToConfirmExport, setSignalToConfirmExport] = React.useState(Date.now());
  let stagedTeam = {...team};

  React.useEffect(() => {
    // console.log('the current ROOT state:', team, lockedSlots);
  }, [team, lockedSlots]);
  React.useEffect(() => {
    let exportTxt: string = stringifyTeam(team);
    console.log(team);
    setTeamData(exportTxt);
  }, [team]);

  function toggleLockSlotN(n: number){
    let newLockedData: LockMatrix = {...lockedSlots};
    newLockedData[n] = !(lockedSlots[n])
    
    setLockedSlots(newLockedData);
    console.log(lockedSlots);
  }

  function sendNewDataToRoot(updatedBattlePokemonObject: BattlePokemon, i: number){
    //called by child components
    //passes finalized pokeObj into root state with index that matches teamSlot number
    console.log('this is where root state would be updated:', i, updatedBattlePokemonObject);
    stagedTeam[i] = updatedBattlePokemonObject;

    
    let newTeamState = {...team};
    newTeamState[i] = updatedBattlePokemonObject;
    //update team state ONCE.
    //This if-statement makes it so that setTeam does not trigger until all components have had a chance to update the stagedTeam array
    if (i > 1){
      console.log('this should only trigger ONCE when the last team slot is passed into stagedTeam');
      setTeam(stagedTeam);
    }
    
    console.log('compare these:', team, stagedTeam);

  }

///lets just try editing main team obj directly.

  function updateTeam(): any{
        //create deep copy of the team obj to not edit state directly
        // let tempObj: Team = JSON.parse(JSON.stringify(stagedTeam));
        //set state
        console.log('calling setTeam 2 seconds after export signal. THIS SHOULD ONLY PRINT ONCE!!!!!!!!!!!!!!!! oh and btw here is the temp obj that should have just been parsed....', stagedTeam)
        // setTeam(tempObj);
  }

  function exportData() {
    setSignalToConfirmExport(Date.now());
    setTimeout(updateTeam, 2000);
  }

  function generateRandomMon() {
    /////randomize mons and set state/////
    //TODO: add lock logic
    //TODO: add item logic
    //TODO: add locked-in mons to teamSoFar array

    //make running list of chosen mons to ensure no duplicate species.
    let teamSoFar: string[] = [];

    //chose 6 mons, checking running list each time

    //generate first mon
    let slot1: BattlePokemon = getRandomPokemon(RandomSetsSV as any);
    teamSoFar.push(slot1.species);

    //generate the rest, checking as you go

    let slot2: BattlePokemon;
    do {
      slot2 = getRandomPokemon(RandomSetsSV as any);
    } while (teamSoFar.includes(slot2.species));
    teamSoFar.push(slot2.species);

    let slot3: BattlePokemon;
    do {
      slot3 = getRandomPokemon(RandomSetsSV as any);
    } while (teamSoFar.includes(slot3.species));
    teamSoFar.push(slot3.species);

    let slot4: BattlePokemon;
    do {
      slot4 = getRandomPokemon(RandomSetsSV as any);
    } while (teamSoFar.includes(slot4.species));
    teamSoFar.push(slot4.species);

    let slot5: BattlePokemon;
    do {
      slot5 = getRandomPokemon(RandomSetsSV as any);
    } while (teamSoFar.includes(slot5.species));
    teamSoFar.push(slot5.species);

    let slot6: BattlePokemon;
    do {
      slot6 = getRandomPokemon(RandomSetsSV as any);
    } while (teamSoFar.includes(slot6.species));
    teamSoFar.push(slot6.species);

    let newTeamState = {
      1: slot1,
      2: slot2,
      3: slot3,
      4: slot4,
      5: slot5,
      6: slot6,
    };

    //update team state ONCE.
    setTeam((prevState) => {
      return { ...prevState, ...newTeamState };
    });
    setTeamData('you hit the generate button. State should have updated.');
    setSignalToUpdateTeamSlot(Date.now());
    // console.log('teamSoFar:', teamSoFar);
  }

  function createStatString(statBlock: any) {
    //take the EVs from the obj and return them as a string
    let statString = 'EVs: ';
    for (let stat in statBlock) {
      //if a stat is not defined, skip it
      if (statBlock[stat]) {
        statString += `${statBlock[stat]} ${stat} / `;
      } 
    }
    return statString;
  }


  function stringifyTeam(team: Team): string {
    //TODO write this
    //stringify poke obj into smogon format
    let exportTxt: string = '';

    for (const i in team) {
      //loop through each pokemon object and parse out its data
      let pokemon = team[i];
      //teraType could by null
      let teraTypeExists: string = pokemon?.teraType
        ? `Tera Type: ${pokemon!.teraType}`
        : '';
      //EV spreads are optional, must be parsed into list
      let evSpread: string = createStatString(pokemon?.evSpread);
      // console.log('EV SPREAD RIGHT HERE:', pokemon?.evSpread)
      //turn moves into hyphenated list
      let moves = pokemon?.moves.map((move) => `-${move}`).join('\n');
      //concatinate all together
      let pokeText = `${pokemon?.species} @ ${pokemon?.item}\nAbility: ${pokemon?.ability}\n${teraTypeExists}\n${evSpread}\n${pokemon?.nature} Nature\n${moves}\n\n`;
      exportTxt = exportTxt.concat('', pokeText);
    }
    // EVs: 84 HP / 84 Atk / 84 Def / 84 SpA / 84 SpD / 84 Spe

    //send the string data to the callback function
    // console.log('trying to send this to textarea:', exportTxt);
    return exportTxt;
  }


  return (
    <>
      <Head>
        <title>Pokemon Team Randomizer</title>
        <meta name="generate random teams for showdown import" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#93d9d1] to-[#15162c]">
        <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-6xl">Pokemon Randomizer</h1>
        <nav id="functionality-buttons" className="flex" >
          <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={generateRandomMon}>generate</button>
          <button className="btn" onClick={exportData}>export</button>
        </nav>
        <div id="todo-this-will-eventually-go-in-modal" className="w-4/5">
          <textarea
            name="export"
            id="export"
            className="h-80 w-full"
            value={teamData}
            onChange={generateRandomMon}
          ></textarea>
                <p className="text-xs text-white bg-black sm:text-lg md:text-2xl lg:text-4xl xl:text-6xl" >
          {Object.keys(team).map((key) =>
            team[key]
              ? `${key}: ${team[key]!.species}; `
              : `${key}: ${team[key]}; `
          )}
                </p>
        </div>

        <div id="team-gui" className="flex flex-wrap">
          <TeamSlot slotNum={1} pokeObj={team[1] ? team[1] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
          <TeamSlot slotNum={2} pokeObj={team[2] ? team[2] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
          <TeamSlot slotNum={3} pokeObj={team[3] ? team[3] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
          <TeamSlot slotNum={4} pokeObj={team[4] ? team[4] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
          <TeamSlot slotNum={5} pokeObj={team[5] ? team[5] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
          <TeamSlot slotNum={6} pokeObj={team[6] ? team[6] : null} toggleLock={toggleLockSlotN} signalToUpdate={signalToUpdateTeamSlot} signalToExport={signalToConfirmExport} exportFinal={sendNewDataToRoot}/>
        </div>


      
      <label htmlFor="my-modal" className="btn">open modal</label>

      {/* Place nothing below here except for the modal!!! */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">Yay!</label>
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default Home;
