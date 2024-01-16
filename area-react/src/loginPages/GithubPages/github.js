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
        let ip = localStorage.getItem("ip");
        if (!localStorage.getItem("ip").includes("http")){
          ip = localStorage.getItem("http") + "://" + localStorage.getItem("ip");
        }
        axios
      .post( ip + '/auth/github', userData, {
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


export const Gitlab = () => {

  useEffect(() => {
      const currentUrl = window.location.href;
      console.log(currentUrl);
      const code = currentUrl.split("=")[1];
      console.log(code);
      const userData = {code};
      let ip = localStorage.getItem("ip");
        if (!localStorage.getItem("ip").includes("http")){
          ip = localStorage.getItem("http") + "://" + localStorage.getItem("ip");
        }
      axios
    .post( ip + '/gitlab', userData, {
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
  let ip = localStorage.getItem("ip");
  if (!localStorage.getItem("ip").includes("http")){
      ip = localStorage.getItem("http") + "://" + localStorage.getItem("ip");
  }
  useEffect(() => {
    const userData = {code};
    axios
    .post( ip + '/google', userData, {
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
  console.log(localStorage.getItem('token'));
  useEffect(() => {
    const userData = {code};
    let ip = localStorage.getItem("ip");
    if (!localStorage.getItem("ip").includes("http")){
      ip = localStorage.getItem("http") + "://" + localStorage.getItem("ip");
    }
    axios
    .post(ip + '/spotify', userData, {
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