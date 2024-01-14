import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from "./App.module.css"
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Login } from './Login/login';
import { Register } from './Register/Register';
import { Workflow } from './Workflow/Workflow';
import { ChosePage } from './Workflow/Workflow';
import { CardStyleInterpolators } from "@react-navigation/stack";
import { GetWorkflow } from './Workflow/getWorkflow';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown : false
      }}>
        <Stack.Screen name="Login" component={Login}
         />
         <Stack.Screen name="Workflow" component={Workflow}
         />
         <Stack.Screen name="GetWorkflow" component={GetWorkflow}
         />
          <Stack.Screen name="Register" component={Register}/>

          <Stack.Screen
            name="chosePage"
            component={ChosePage}
            options={{
              presentation: "modal",
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardStyle: {
                backgroundColor: "transparent",
                opacity: 0.99,
              },
              gestureResponseDistance: 500,
            }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}