import { View, Button } from "react-native"
import { LogoutUser } from "../Login/login"
import { useNavigation } from "@react-navigation/native"
export const Workflow = () => {

    const navigation = useNavigation();

    return(
        <View style = {{marginTop : 100}}>
            <Button title = "Deconnexion" onPress={() => {LogoutUser().then(() => {navigation.navigate("Login")})}}></Button>
        </View>
    )
}