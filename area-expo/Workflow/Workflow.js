import { View, Button, TouchableOpacity, Text, TextInput } from "react-native"
import { LogoutUser } from "../Login/login"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./css/Workflow.module.css"
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Input_Selector } from "../Utils/Utils";
import {IP} from "@env"
export const ChosePage = (props) => {
        const navigation = useNavigation();
        console.log(props.route.params);
        const mode = props.route.params.action;
        const [data, setdata] = useState([]);
        const [bearerToken, setbearerToken] = useState([]);
        useEffect(() => {
            AsyncStorage.getItem("token").then((token) => {setbearerToken(token)});
            console.log(bearerToken);
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
                    setdata(response.data[0]);
                })
                .catch((error) => {
                    
                });
        }, [bearerToken]);
        // console.log(data[mode]["0"]);
    return(
        <View>
        {data.actions || data.triggers?
            <View>
                <TouchableOpacity onPress={() => {props.route.params.function(data), navigation.goBack()}}>
                    <Text>
                        {data.name}
                    </Text>
                </TouchableOpacity>
            </View> : <></>
        }
    </View>
    );
}


const Create_Workflow = () => {
    const navigation = useNavigation();
    const [choseAction, setChoseAction] = useState({});
    const [choseTrigger, setChoseTrigger] = useState({});
    const [name, setName] = useState("");
    const [continuer, setContinuer] = useState(false);
    const [actionparams, setactionparams] = useState({});
    const [triggerparams, settriggerparams] = useState({});
    return(
        <View>
            { continuer == false ?
            <View>
                <TextInput value = {name} onChangeText={(text) => {setName(text)}}  placeholder="entrez un nom pour le workflow" style = {{backgroundColor : 'white'}}></TextInput>
                <TouchableOpacity onPress={() => {navigation.navigate("chosePage", {action : "actions", function : setChoseAction})}}>
                    <Text>{Object.keys(choseAction).length === 0 ? "+" : choseAction.name}</Text>
                </TouchableOpacity>
                <Text>{"-->"}</Text>
                <Text>{"<--"}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate("chosePage", {action : "triggers", function : setChoseTrigger})}}>
                <Text>{Object.keys(choseTrigger).length === 0 ? "+" : choseTrigger.name}</Text>
                </TouchableOpacity>
                {
                    Object.keys(choseAction).length != 0 && Object.keys(choseTrigger).length != 0 && name != ""? 
                    <Button title = "continuer" onPress={() => {setContinuer(true)}}></Button> : <></>
                }
            </View>
    :   <View style = {{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', width : "80%", alignSelf : 'center'}}>
            <View>
                <Text>{Object.keys(choseAction).length === 0 ? "+" : choseAction.name}</Text>
                {choseAction["actions"]["0"].params.map((val) => {
                    {
                        if (val.type == "enum"){
                            return (<Input_Selector data = {val.values} setaction = {setactionparams} action = {actionparams}></Input_Selector>)
                        } else {
                            return (<TextInput placeholder={val.name} style = {{backgroundColor : 'white'}}></TextInput>)
                        }
                    }

                })}
                
            </View>
            <View>
                <Text>{Object.keys(choseTrigger).length === 0 ? "+" : choseTrigger.name}</Text>
                {choseTrigger["triggers"]["0"].params.map((val) => {
                    {
                        if (val.type == "enum"){
                            return (<Input_Selector data = {val.values} setaction = {settriggerparams} action = {triggerparams} ></Input_Selector>)
                        } else {
                            return (<TextInput placeholder={val.name} style = {{backgroundColor : 'white'}}></TextInput>)
                        }
                    }

                })}
            </View>

    </View>
        }
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
        <View style = {{marginTop : 100}}>
            <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
            <Create_Workflow></Create_Workflow>
        </View>
        </LinearGradient>
    )
}