import { View, Button, TouchableOpacity, Text, TextInput, Image , Alert, ScrollView, SafeAreaView, Switch} from "react-native"
import { useNavigation } from "@react-navigation/native"
import {IP, SERVICEIP} from "@env"
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import styles from "./css/services.module.css";
export const Services = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fonction = async () => {
            const Token = await AsyncStorage.getItem("token");
            setToken(Token);
        }
        fonction();
    }, []);

    return(
        <LinearGradient
        colors={["#0062ff",  "#da61ff", "#3DC8D2"]}
        style = {styles.container}
      >
        <View style = {{marginTop : 30, flexDirection : 'column', justifyContent : 'space-between', height : '95%', width : "100%"}}>
            { token != null ?
            <View>
            <SafeAreaView>
                <ScrollView  horizontal = {true}>
                    <TouchableOpacity style = {styles.opa} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/spotify" + "/" + IP )}><Text style = {styles.text}>Spotify</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.opa} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/google" + "/" + IP )}><Text style = {styles.text}>Google</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.opa} onPress={() => WebBrowser.openBrowserAsync(SERVICEIP + "/frontmobile/" + token + "/github" + "/" + IP )}><Text style = {styles.text}>Github</Text></TouchableOpacity>
                </ScrollView>
        
            </SafeAreaView>
        
            </View>
            :<></>
            }

            <Navbar actualPage={"Services Connexions"}></Navbar>
        </View>
        
        </LinearGradient>
    );

};
