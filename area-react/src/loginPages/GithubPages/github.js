import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const Github = () => {

    useEffect(() => {
        const currentUrl = window.location.href;
        console.log(currentUrl);
        const code = currentUrl.split("=")[1];
        console.log(code);
        const userData = {code};
        axios
      .post("http://" + localStorage.getItem("ip") + ':8080/auth/github', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((response) => {
        if (response.status === 200) {
            console.log("Sucess registration");
            window.location = "/workflow";
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


export const Google = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    const userData = {code};
    axios
    .post("http://" + localStorage.getItem("ip") + ':8080/google', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.status === 200) {
          console.log("Sucess registration");
          window.location = "/workflow";
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


export const Spotify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    const userData = {code};
    axios
    .post("http://" + localStorage.getItem("ip") + ':8080/spotify', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.status === 200) {
          console.log("Sucess registration");
          window.location = "/workflow";
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