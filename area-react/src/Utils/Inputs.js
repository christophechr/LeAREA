import { useState } from "react";

export const NominalInputs = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);
    return(
        <input placeholder={action.name} value = {value} onChange={(e) => {setValue(e.target.value)}} 
        onBlur={() => {const list = Val;
                            list[action.id] = value;
                            setVal({...list})}} ></input>
    );
}


export const CheckboxInputs = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);
    return(
        <label>
        {action.name}
        <select value = {value} onChange={(e) => {setValue(e.target.value)}}  onBlur={() => {const list = Val;
                            list[action.id] = value;
                            setVal({...list})}}>
          <option value="">Choisir...</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </label>
    );
}

export const EqualityInputs = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);
    return(
        <label>
        {action.name}
        <select value = {value} onChange={(e) => {setValue(e.target.value)}}  onBlur={() => {const list = Val;
                            list[action.id] = value;
                            setVal({...list})}}>
          <option value="">Choisir...</option>
          {action.values.map((val) => {return(<option value = {val.value} > {val.name}</option>)})}  
        </select>
      </label>
    );
}


export const NumberInputs = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);
    return(
        <input type="number" placeholder={action.name} value = {value} onChange={(e) => {setValue(e.target.value)}} 
        onBlur={() => {const list = Val;
                            list[action.id] = value;
                            setVal({...list})}} ></input>
    );
}