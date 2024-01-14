
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';

export const Input_Selector = ({data, setaction, action}) =>{
    const [selected, setSelected] = useState({});
    let newArray = [];
    if (data != undefined) {
        newArray = Object.values(data).map((val) => {return {value : val, label : val.name}});
    }
    return(
        <View>
             <RNPickerSelect
             textInputProps={{fontSize : 30}}
            onValueChange={(value) => console.log(value)}
            items={newArray}
        />
        </View>
    );

}
