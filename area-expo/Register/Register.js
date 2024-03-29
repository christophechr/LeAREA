import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from "./css/Register.module.css"
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {IP} from '@env'

const RegisterUser = async (email, password) => {
    return new Promise((resolve, reject) => {
      if (email === "" || password === "") {
        window.alert("Email and password are required");
        reject(new Error("Email and password are required"));
        return;
      }
  
      const userData = {
        email: email,
        password: password,
      };
  
      console.log(userData);
      
      axios
        .post(IP + '/auth/register', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            Alert.alert("Success account creation", "vous êtes connecter");
            console.log(response.data);
            await AsyncStorage.setItem("id", response.data.id);
            await AsyncStorage.setItem("token", response.data.token);
            resolve(response.data); // Resolve with the data
          } else {
            console.log("erreur");
            reject(new Error(`Unexpected response status: ${response.status}`));
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
          Alert.alert("an error occurred", error.message);
          reject(error);
        });
        console.log("finish");
    });
  };

  


export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        console.log(email, password);

    }, [email, password]);
  return (
    <LinearGradient
      colors={["#0062ff",  "#da61ff", "#3DC8D2"]}
      style = {styles.container}
    >
    <View style = {styles.logincage}>
        <Text style = {{textAlign : 'center', fontWeight : 'bold', fontSize : 30}}>Welcome !</Text>
    <Text style = {{textAlign : 'center'}}>You have an account <Text onPress={() => {navigation.navigate("Login")}}>Sign in</Text></Text>
    <TextInput style = {styles.textinput} placeholder='email' keyboardType='email' onChangeText={(text) => {setEmail(text)}}></TextInput>
    <TextInput style = {styles.textinput} placeholder='password' secureTextEntry={true}  onChangeText={(text) => {setPassword(text)}}></TextInput>
    <TouchableOpacity  style = {styles.touchableopacity} onPress={() => {RegisterUser(email, password)
        .then((user) => {console.log(user); navigation.navigate("Workflow")})
        .catch((error) => {console.log(error)})}}>
        <Text style = {{textAlign : "center", color : "white", fontWeight : 'bold'}}>Sign Up</Text>
    </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}