
import { useEffect } from "react";
import axios from "axios";

export const Github = () => {

    useEffect(() => {
        const currentUrl = window.location.href;
        console.log(currentUrl);
        const code = currentUrl.split("=")[1];
        console.log(code);
        const userData = {code};
        axios
      .post('http://localhost:8080/auth/github/save', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((response) => {
        if (response.status === 200) {
            console.log("Sucess registration");
        } else {
            console.log("Error: " + response.status);
        }
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    return(
        <div>
            <span>you will be redirected in 5 sec ...</span>
        </div>

    )

};