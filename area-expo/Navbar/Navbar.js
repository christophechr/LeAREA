import { View, Button, TouchableOpacity, Text, TextInput, Image , Alert} from "react-native"
import { useNavigation } from "@react-navigation/native"
import {IP} from "@env"


const Element  = ({text, actualPage, goto}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => {navigation.navigate(goto)}}>
            <Text style = {text == actualPage ?{fontWeight : 'bold'} : {}}>{text}</Text>
        </TouchableOpacity>
    );
}

export const Navbar = ({actualPage}) =>{

    return(
        <View style = {{height : 70, alignSelf : 'stretch', backgroundColor : 'white', bottom : -13, flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center'}}>
            <Element text = {"Create Workflow"} actualPage = {actualPage} goto = {"Workflow"}></Element>
            <Element text = {"My Workflows"} actualPage = {actualPage} goto = {"GetWorkflow"}></Element>
            <Element text = {"Services Connexions"} actualPage = {actualPage}></Element>
        </View>

    )
}