
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';

export const Input_Selector = ({data, setaction, action}) =>{
    const [selected, setSelected] = useState("hey");

   
    let newArray = data.map((val) => {return {key : val.value, value : val.value }});
    console.log(action);
    return(
        <View>
            <SelectList setSelected={(val) => {setSelected(val)}} data={newArray} onSelect={() => {const list = action;
                            list[action.id] = selected;
                            setaction({...list})
                            }} />
        </View>
    );

}