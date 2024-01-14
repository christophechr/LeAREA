
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text, TextInput } from 'react-native'
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
            onValueChange={setSelected}
            items={newArray}
            onClose={() => {setaction(selected)}}
        />
        </View>
    );
}


export const CustomInput_Selector = ({setVal, Val, action}) =>{
    const [value, setValue] = useState(Val[action.id]);
    let newArray = [];
    if (action != undefined) {
        newArray = action.values.map((val) => {return {value : val.value, label : val.name}});
    }

    return(
        <View>
            <Text style = {{fontWeight : 'bold'}}>{action.name}</Text>
            <View style = {{borderWidth : 1, borderColor : "black", width : 200}}>
             <RNPickerSelect
             textInputProps={{fontSize : 20, color : 'black'}}
            onValueChange={setValue}
            items={newArray}
            onClose={() => {const list = Val;
                list[action.id] = value;
                setVal({...list})}}
        />
        </View>
        </View>
    );
}



export const CustomTextInput = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);

    return(
        <View>
            <Text style = {{fontWeight : 'bold'}}>{action.name}</Text>
        <TextInput style = {{borderWidth : 1, borderColor : 'black', width : 200}} placeholder={action.description} value = {value} onChangeText={(val) => {setValue(val)}} 
        onBlur={() => {const list = Val;
            list[action.id] = value;
            setVal({...list})}}></TextInput>
        </View>

    );

}


export const CustomNumberInput = ({setVal, Val, action}) => {
    const [value, setValue] = useState(Val[action.id]);

    return(
        <View>
            <Text style = {{fontWeight : 'bold'}}>{action.name}</Text>
        <TextInput keyboardType = 'number-pad' style = {{borderWidth : 1, borderColor : 'black', width : 200}} placeholder={action.description} value = {value} onChangeText={(val) => {setValue(val)}} 
        onBlur={() => {const list = Val;
            list[action.id] = parseInt(value);
            setVal({...list})}}></TextInput>
        </View>

    );

}
