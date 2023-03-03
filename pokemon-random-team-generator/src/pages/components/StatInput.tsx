import React from "react";
import { useState } from "react";

export default function StatInput(){
    //make state from prop
    
    //allow state to be changed

    //validate number

    //make sure number is longer

    return (
        <div className="form-control">
            <label className="input-group input-group-xs ml-3">
                <span>HP</span>
                <input type="number" min={0} max={252} placeholder="0" className="input input-bordered input-xs w-14" />
            </label>
        </div>
      );
}