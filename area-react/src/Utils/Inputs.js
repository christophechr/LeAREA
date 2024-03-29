import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

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


export const DateInputs = ({setVal, Val, action}) => {
  const [value, setValue] = useState(new Date(Val[action.id]));
  return(
    <DateTimePicker value = {value} onChange={(val) => {setValue(val)}}
    onClockClose={() => {
      console.log(value.toISOString());
      const list = Val;
                list[action.id] = value.toISOString();
                setVal({...list})}}
                        
    />
  );

}