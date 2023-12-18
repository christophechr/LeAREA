import { LogoutUser } from "../loginPages/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const github_connexion = () => {
    const bearerToken = localStorage.getItem('token');

    const apiUrl = 'http://localhost:8080/auth/github';

    const axiosConfig = {
    method: 'get',
    url: apiUrl,
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json', 
    },
    };

    axios(axiosConfig)
    .then(response => {
        console.log(response.data);
        window.location = response.data.url;
    })
    .catch(error => {
        console.error(error);
    });

};


export const Workflowpage = () => {
    const navigation = useNavigate();

    return(
        <div>
        <div>hey</div>
        <button onClick={() => {LogoutUser(); navigation("/login")}}>logout</button>
        <button onClick={() => {github_connexion()}}>github</button>

        </div>
    );
}