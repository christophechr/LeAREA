import { View, Button, TouchableOpacity, Text, TextInput, Image , Alert} from "react-native"
import { LogoutUser } from "../Login/login"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./css/Workflow.module.css"
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CustomInput_Selector, CustomNumberInput, CustomTextInput, Input_Selector } from "../Utils/Utils";
import {IP} from "@env"
import RNPickerSelect from 'react-native-picker-select';
import { Navbar } from "../Navbar/Navbar";

export const ChosePage = (props) => {
        const navigation = useNavigation();
        console.log(props.route.params);
        const mode = props.route.params.action;
        const [data, setdata] = useState([]);
        const [bearerToken, setbearerToken] = useState([]);
        const url = IP + "";
        useEffect(() => {
            AsyncStorage.getItem("token").then((token) => {setbearerToken(token)});
            const apiUrl = IP + "/" + mode;
            
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

const createWorkflow = async (actionid, actionparams, triggerid, triggerparams, name, setContinuer) => {
    const json = {
        "name" : name,
        "trigger" : {
            "id" : triggerid,
            "params" : triggerparams,
        },
        "action" : {
            "id" : actionid,
            "params" : actionparams,
        }
    }
    const token = await AsyncStorage.getItem("token");
    console.log(json);
    axios
      .post(IP + '/flows', json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        },
      })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("created workflow successfully");
          setContinuer(1);
        } else {
          Alert.alert("il y a peux être eu un soucis", response.status);
          setContinuer(1);
        }
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        Alert.alert(error.message);
      });
}





const Create_Workflow = () => {
    const navigation = useNavigation();
    const [choseAction, setChoseAction] = useState({});
    const [choseTrigger, setChoseTrigger] = useState({});
    const [name, setName] = useState("");
    const [continuer, setContinuer] = useState(1);
    const [chosesousaction, setchosesousaction] = useState({});
    const [chosesoustrigger, setchosesoustrigger] = useState({});
    const url = IP + "";

    const SetArg = () => {
        const [actionparams, setactionparams] = useState({});
        const [triggerparams, settriggerparams] = useState({});
        const [change, setchange] = useState(true);
       console.log(chosesoustrigger);
        return(
            <View>
            {!change ?
            <View style = {{width : 'auto', height : 'auto', minHeight : 300, backgroundColor : 'rgba(255,255,255, 0.5)', marginBottom : 20, borderRadius : 10}}>
                <View style = {{padding : 20, flexDirection : 'column', justifyContent : 'space-around', minHeight : 250}}>
                    <Image source = {{uri : url + choseTrigger.img}} style = {{width : 30, height : 30, alignSelf : 'center'}}></Image>
                    {
                        chosesoustrigger.params.map((val) => {
                            return(
                                <View>
                                    {
                                        val.type == "string" ?
                                        <CustomTextInput setVal = {settriggerparams} Val = {triggerparams} action = {val}/>
                                        : val.type == "enum" || val.type == "boolean" ?
                                        <CustomInput_Selector setVal = {settriggerparams} Val = {triggerparams} action = {val} /> : 
                                        <CustomNumberInput setVal = {settriggerparams} Val = {triggerparams} action = {val}/>
                                    }
                                </View>
                            );})
                    }
                </View>
            </View>
            : 
            <View style = {{width : 'auto', height : 'auto', minHeight : 300, backgroundColor : 'rgba(255,255,255, 0.5)', marginBottom : 20, borderRadius : 10}}>
                <View style = {{padding : 20, flexDirection : 'column', justifyContent : 'space-around', minHeight : 250}}>
                    <Image source = {{uri : url + choseAction.img}} style = {{width : 30, height : 30, alignSelf : 'center'}}></Image>
                    {
                        chosesousaction.params.map((val) => {
                            return(
                                <View>
                                    {
                                        val.type == "string" ?
                                        <CustomTextInput setVal = {setactionparams} Val = {actionparams} action = {val}/>
                                        : val.type == "enum" || val.type == "boolean" ?
                                        <CustomInput_Selector setVal = {setactionparams} Val = {actionparams} action = {val} /> : <></>
                                    }
                                </View>
                            );})
                    }
                </View>
            </View>}
                <View style = {{flexDirection : 'row-reverse'}}>
                    <TouchableOpacity onPress={() => {change ? setchange(false) : createWorkflow(choseAction.id + "." + chosesousaction.id, actionparams, choseTrigger.id + "." + chosesoustrigger.id, triggerparams, name , setContinuer) }} style = {{alignSelf : 'center', backgroundColor : 'blue', borderRadius : 10, width : 150, height : 50, justifyContent : 'center'}}>
                                <Text style = {{color : 'white', alignSelf : 'center', fontWeight : 'bold'}}>Suivant</Text>
                                </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => {!change ? setchange(true) : setContinuer(continuer - 1)}} style = {{alignSelf : 'center', backgroundColor : 'blue', borderRadius : 10, width : 150, height : 50, justifyContent : 'center'}}>
                    <Text style = {{color : 'white', alignSelf : 'center', fontWeight : 'bold'}}>Retour</Text>
                    </TouchableOpacity> 

                </View>
            </View>
        );
    }

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
                <View>
                    <Text style={{ fontSize: 50, alignSelf: 'center' }}>On</Text>
                    <Input_Selector data={choseTrigger.triggers} setaction={setchosesoustrigger}></Input_Selector>
                    <Text style={{ fontSize: 50, alignSelf: 'center' }}>Do</Text>
                    <Input_Selector data={choseAction.actions} setaction={setchosesousaction}></Input_Selector>
                </View>
                :continuer == 3 ?
                <View style = {{flexDirection : 'column'}}>
                    <Text style = {{fontWeight : 'bold', fontSize : 20, marginBottom : 30}}>Set a Valid Name to your Workflow</Text>
                    <TextInput style = {{borderWidth : 1, borderColor : 'black', width : 200, alignSelf : 'center', fontSize : 20}} value = {name} onChangeText={setName}/>
                </View>
                : continuer == 4 ? 
                <SetArg/> 
                :
                <></>
            }
            <View style = {{flexDirection : 'row-reverse', justifyContent : 'space-around'}}>
                {
                    Object.keys(choseAction).length != 0 && Object.keys(choseTrigger).length != 0 && continuer < 4?
                    <TouchableOpacity onPress={() => {continuer == 3 && name == "" ? Alert.alert("to continue you must put a name") : setContinuer(continuer + 1)}} style = {{alignSelf : 'center', backgroundColor : 'blue', borderRadius : 10, width : 150, height : 50, justifyContent : 'center'}}>
                        <Text style = {{color : 'white', alignSelf : 'center', fontWeight : 'bold'}}>Continuer</Text>
                        </TouchableOpacity>:<></>
                }
                {
                    continuer > 1 && continuer < 4? 
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
        <View style = {{marginTop : 30, flexDirection : 'column', justifyContent : 'space-around', height : '100%', width : "100%"}}>
            <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
            <Text style = {{alignSelf : 'center', fontWeight : 'bold', color : 'white', fontSize : 40}}>New Workflow</Text>
            <View style = {{alignSelf : 'center'}}><Create_Workflow></Create_Workflow></View>
            <Navbar actualPage={"Create Workflow"}></Navbar>
        </View>
        
        </LinearGradient>
    )
}