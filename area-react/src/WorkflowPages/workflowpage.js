import { LogoutUser } from "../loginPages/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/workflowpage.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const github_connexion = () => {
    const bearerToken = localStorage.getItem("token");

    const apiUrl = "http://localhost:8080/auth/github";

    const axiosConfig = {
        method: "get",
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
        },
    };

    axios(axiosConfig)
        .then((response) => {
            console.log(response.data);
            window.location = response.data.url;
        })
        .catch((error) => {
            console.error(error);
        });
};

const PopupCustom = ({ mode }) => {
    const [open, setopen] = useState(false);
    const [data, setdata] = useState([]);
    console.log(mode);
    const bearerToken = localStorage.getItem("token");
    const apiUrl = "http://localhost:8080/" + mode;
    const axiosConfig = {
        method: "get",
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
        },
    };
    useEffect(() => {
        axios(axiosConfig)
            .then((response) => {
                console.log(response.data);
                setdata(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [open]);

    return (
        <Popup
            modal
            nested
            onOpen={() => setopen((o) => !o)}
            trigger={<button className="cross-button">+</button>}
            position="right center"
            contentStyle={{
                background: "rgba(255,255,255,1)",
                height: 400,
                borderRadius: 10,
            }}
        >
            <div>
                {data.map((val) => {
                    return <button className="block">{val.name}</button>;
                })}
            </div>
        </Popup>
    );
};

const NewWorkflow = () => {
    return (
        <div className="newWorkflow">
            <input
                style={{ width: 150 }}
                placeholder="new workflow name"
            ></input>
            <div className="workflow-factory">
                <PopupCustom mode="actions"></PopupCustom>
                <div className="cross">
                    <span style={{ fontSize: 90 }}>{"--->"}</span>
                    <span style={{ fontSize: 90 }}>{"<---"}</span>
                </div>
                <PopupCustom mode="triggers"></PopupCustom>
            </div>
        </div>
    );
};

export const Workflowpage = () => {
    const navigation = useNavigate();

    return (
        <div className="page">
            <div className="vide">
                <button
                    onClick={() => {
                        LogoutUser();
                        navigation("/login");
                    }}
                >
                    logout
                </button>
                <button
                    onClick={() => {
                        github_connexion();
                    }}
                >
                    github
                </button>
            </div>
            <div className="workflowstation">
                <div className="navigation-button">
                    <button className="nav-b">new workflow</button>
                    <button className="nav-b">my workflow</button>
                </div>
                <NewWorkflow></NewWorkflow>
                {/* <div>hey</div>
                <button onClick={() => {github_connexion()}}>github</button> */}
            </div>
        </div>
    );
};
