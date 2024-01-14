import { View, Button, TouchableOpacity, Text, TextInput, Image , Alert, ScrollView, SafeAreaView, Switch} from "react-native"
import { useNavigation } from "@react-navigation/native"
import {IP} from "@env"
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./css/Workflow.module.css"
import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const changeFlow = async (id, isEnabled) => {
    const token = await AsyncStorage.getItem("token");
    const json = {
        enabled : isEnabled,
    };
    const apiUrl = "http://" + IP + ":8080/flows/" + id;
            
    const axiosConfig = {
                method: "put",
                url: apiUrl,
                data : json,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
    axios(axiosConfig)
        .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                });
        }

export const GetWorkflow = () =>{
    const [data, setdata] = useState(null);
    const [isEnabled, setEnabled] = useState(false);
    const [id, setId] = useState();
    useEffect(() => {
        const fonction = async () => {
            const token = await AsyncStorage.getItem("token");
            const apiUrl = "http://" + IP + ":8080/flows";
            
            const axiosConfig = {
                method: "get",
                url: apiUrl,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            axios(axiosConfig)
                .then((response) => {
                    setdata(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fonction();
    }, [isEnabled]);


    return(
    
        <LinearGradient
        colors={["#0062ff",  "#da61ff", "#3DC8D2"]}
        style = {styles.container}
      >
        <View style = {{marginTop : 30, flexDirection : 'column', justifyContent : 'space-around', height : '100%', width : "100%"}}>
        <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
            <Text style = {{alignSelf : 'center', fontWeight : 'bold', color : 'white', fontSize : 40}}>My Workflows</Text>
            <Text style = {{fontSize : 15, color : 'white'}}><Text style = {{fontWeight : 'bold'}}>!tips</Text> : to change the state of a workflow please click twice quikly on the switcher</Text>
            {data != null ?
            <SafeAreaView>
            <ScrollView style = {{minHeight : 200}} >
            {data.map((val) => {
                return(
                    <View style = {{borderTopWidth : 1, borderBottomWidth : 1, borderTopColor : "white", borderBottomColor : 'white'
                    , flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center'}}>
                        <Text style = {{fontSize : 40, fontWeight : 'bold', color : 'white'}}>{val.name}</Text>
                        <Switch
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {changeFlow(val._id, value).then(() => {setEnabled((e) => !e)});}}
                        value={val.enabled}
                        />
                    </View>
                );
            })}
            </ScrollView>
            </SafeAreaView>
            :<></>

            }
            <Navbar actualPage={"My Workflows"}></Navbar>
        </View>
        
        </LinearGradient>
    )
}