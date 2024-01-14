import { View, Button, TouchableOpacity, Text, TextInput, Image } from "react-native"
import { LogoutUser } from "../Login/login"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./css/Workflow.module.css"
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Input_Selector } from "../Utils/Utils";
import {IP} from "@env"
import RNPickerSelect from 'react-native-picker-select';

export const ChosePage = (props) => {
        const navigation = useNavigation();
        console.log(props.route.params);
        const mode = props.route.params.action;
        const [data, setdata] = useState([]);
        const [bearerToken, setbearerToken] = useState([]);
        const url = "http://" + IP + ":8080";
        useEffect(() => {
            AsyncStorage.getItem("token").then((token) => {setbearerToken(token)});
            const apiUrl = "http://" + IP + ":8080/" + mode;
            
            const axiosConfig = {
                method: "get",
                url: apiUrl,
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    "Content-Type": "application/json",
                },
            };
            axios(axiosConfig)
                .then((response) => {
                    setdata(response.data);
                })
                .catch((error) => {
                    
                });
        }, [bearerToken]);
        // console.log(data[mode]["0"]);
    return(
        <View>
        {data?
            <View style = {{flexDirection : 'row', gap : 40, marginTop : 30, marginLeft : 20}}>
                {Object.values(data).map(val => { return(
                <TouchableOpacity  style = {styles.image} onPress={() => {props.route.params.function(val), navigation.goBack()}}>
                    <Image source={{uri : url + val.img}} style = {{width : 60, height : 60,}}></Image>
                </TouchableOpacity>);})}
            </View> : <></>
        }
    </View>
    );
}




const Create_Workflow = () => {
    const navigation = useNavigation();
    const [choseAction, setChoseAction] = useState({});
    const [chosesousaction, setchosesousaction] = useState({});
    const [chosesoustrigger, setchosesoustrigger] = useState({});
    const [choseTrigger, setChoseTrigger] = useState({});
    const [name, setName] = useState("");
    const [continuer, setContinuer] = useState(1);
    const [actionparams, setactionparams] = useState({});
    const [triggerparams, settriggerparams] = useState({});

    const ChooseTrigger = () => {
        return(
            <View>
                <Text style = {{fontSize : 50, alignSelf : 'center'}}>On</Text>
               <Input_Selector data = {choseAction.actions} setaction={setchosesousaction} ></Input_Selector>
            <Text style = {{fontSize : 50, alignSelf : 'center'}}>Do</Text>
            <Input_Selector data = {choseTrigger.triggers} setaction={setchosesoustrigger} ></Input_Selector>
            </View>
        );
    }

    const SetArg = () => {
        console.log(chosesousaction.params);
        return(
            <View>

            </View>

        );
    }


    const url = "http://" + IP + ":8080";
    return(
        <View style = {{flexDirection : 'column', justifyContent : 'space-between', height : "40%"}}>

            { continuer == 1 ?
                <View style = {styles.chose}>
                    {/* <TextInput value = {name} onChangeText={(text) => {setName(text)}}  placeholder="entrez un nom pour le workflow" style = {{backgroundColor : 'white'}}></TextInput> */}
                    <TouchableOpacity  style = {styles.plus}  onPress={() => {navigation.navigate("chosePage", {action : "actions", function : setChoseAction})}}>

                        {Object.keys(choseAction).length === 0 ? <Text>+</Text> : <Image source = {{uri : url + choseAction.img}} style = {{width : 30, height : 30}}></Image>}
                    </TouchableOpacity>
                    <View style = {{marginRight : 10, marginLeft : 10}}>
                        <Text style = {{fontSize : 40}}>{"-->"}</Text>
                        <Text style = {{fontSize : 40}}>{"<--"}</Text>
                    </View>
                    <TouchableOpacity style = {styles.plus} onPress={() => {navigation.navigate("chosePage", {action : "triggers", function : setChoseTrigger})}}>
                    {Object.keys(choseTrigger).length === 0 ? <Text>+</Text> : <Image source = {{uri : url + choseTrigger.img}} style = {{width : 30, height : 30}}></Image>}
                    </TouchableOpacity>
                
                </View> 
                : continuer == 2 ?
                <ChooseTrigger></ChooseTrigger> 
                : continuer == 3 ? 
                <></> 
                :
                <></>
            }
            <View style = {{flexDirection : 'row-reverse', justifyContent : 'space-around'}}>
                {
                    Object.keys(choseAction).length != 0 && Object.keys(choseTrigger).length != 0 ?
                    <TouchableOpacity onPress={() => {setContinuer(continuer + 1)}} style = {{alignSelf : 'center', backgroundColor : 'blue', borderRadius : 10, width : 150, height : 50, justifyContent : 'center'}}>
                        <Text style = {{color : 'white', alignSelf : 'center', fontWeight : 'bold'}}>Continuer</Text>
                        </TouchableOpacity>:<></>
                }
                {
                    continuer > 1 ? 
                    <TouchableOpacity onPress={() => {setContinuer(continuer - 1)}} style = {{alignSelf : 'center', backgroundColor : 'blue', borderRadius : 10, width : 150, height : 50, justifyContent : 'center'}}>
                    <Text style = {{color : 'white', alignSelf : 'center', fontWeight : 'bold'}}>Retour</Text>
                    </TouchableOpacity>:<></>
                }
            </View>
    </View>
    );
}


export const Workflow = () => {

    const navigation = useNavigation();

    return(
        <LinearGradient
        colors={["#0062ff",  "#da61ff", "#3DC8D2"]}
        style = {styles.container}
      >
        <View style = {{marginTop : 30, flexDirection : 'column', justifyContent : 'space-around', height : '100%'}}>
            <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
            <Text style = {{alignSelf : 'center', fontWeight : 'bold', color : 'white', fontSize : 40}}>New Workflow</Text>
            <Create_Workflow></Create_Workflow>
            <View></View>
            <View></View>
        </View>
        </LinearGradient>
    )
}