import { View, Button, TouchableOpacity, Text, TextInput, Image , Alert, ScrollView, SafeAreaView, Switch} from "react-native"
import { useNavigation } from "@react-navigation/native"
import {IP, SERVICEIP} from "@env"
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { LogoutUser } from "../Login/login";
import styles from "./css/services.module.css";
export const Services = () => {
    const [token, setToken] = useState(null);
    const [data, setdata] = useState(null);

    useEffect(() => {
        const fonction = async () => {
            const Token = await AsyncStorage.getItem("token");
            setToken(Token);
        }
        fonction();
    }, []);

    useEffect(() => {
        const fonction = async () => {
            const token = await AsyncStorage.getItem("token");
            const apiUrl = IP + "/auth/me";
            
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
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fonction();
    }, [token]);

    return(
        <LinearGradient
        colors={["#0062ff",  "#da61ff", "#3DC8D2"]}
        style = {styles.container}
      >
        <View style = {{marginTop : 30, flexDirection : 'column', justifyContent : 'space-between', height : '95%', width : "100%"}}>
            { token != null ?
            <View>
                 <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
                <Text style = {{alignSelf : 'center', fontWeight : 'bold', color : 'white', fontSize : 40}}>My Services</Text>
            <SafeAreaView>
            { data != null ?
                <ScrollView  horizontal = {true}>
                    <TouchableOpacity style = {[styles.opa, !data.isSpotifyConnected ? {backgroundColor : 'rgba(255,0,0, 0.5)'} : {backgroundColor : 'rgba(0,255,0, 0.5)'} ]} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/spotify" + "/" + IP )}><Text style = {styles.text}>Spotify</Text></TouchableOpacity>
                    <TouchableOpacity style = {[styles.opa, !data.isGoogleConnected ? {backgroundColor : 'rgba(255,0,0, 0.5)'} : {backgroundColor : 'rgba(0,255,0, 0.5)'}]} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/google" + "/" + IP )}><Text style = {styles.text}>Google</Text></TouchableOpacity>
                    <TouchableOpacity style ={[styles.opa, !data.isGithubConnected ? {backgroundColor : 'rgba(255,0,0, 0.5)'} : {backgroundColor : 'rgba(0,255,0, 0.5)'}]} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/github" + "/" + IP )}><Text style = {styles.text}>Github</Text></TouchableOpacity>
                    
                </ScrollView>
                :<></>
            }
            </SafeAreaView>
        
            </View>
            :<></>
            }

            <Navbar actualPage={"Services Connexions"}></Navbar>
        </View>
        
        </LinearGradient>
    );

};
