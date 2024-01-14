import { LogoutUser } from "../loginPages/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/workflowpage.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CheckboxInputs, DateInputs, EqualityInputs, NominalInputs, NumberInputs } from "../Utils/Inputs";
import { Switch } from 'react-switch-input';

const github_connexion = () => {
    const bearerToken = localStorage.getItem("token");

    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/auth/github";

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
            window.location = response.data.url;
        })
        .catch((error) => {
            console.error(error);
        });
};

const gitlab_connexion = () => {
    const bearerToken = localStorage.getItem("token");

    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/gitlab";

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
            window.location = response.data.url;
        })
        .catch((error) => {
            console.error(error);
        });
};

const spotify_connexion = () => {
    const bearerToken = localStorage.getItem("token");

    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/spotify";

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
            window.location = response.data.url;
        })
        .catch((error) => {
            console.error(error);
        });
};


const google_connexion = () => {
    const bearerToken = localStorage.getItem("token");

    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/google";

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
            window.location = response.data.url;
        })
        .catch((error) => {
            console.error(error);
        });
};



const createWorkflow = (actionid, actionparams, triggerid, triggerparams, name) => {
    const json = {
        "name" : name,
        "trigger" : {
            "id" : triggerid,
            "params" : triggerparams,
        },
        "action" : {
            "id" : actionid,
            "params" : actionparams,
        }
    }
    console.log(json);
    axios
      .post("http://" + localStorage.getItem("ip") + ':8080/flows', json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
      })
      .then((response) => {
        if (response.status === 201) {
          window.alert("created workflow successfully");
          window.location = "/workflow"
        } else {
          window.alert("il y a peux être eu un soucis", response.status)
          window.location = "/workflow"
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        window.alert(error.message);
      });
}


const NewWorkflow = () => {
    const [action, getAction] = useState(null);
    const [trigger, getTrigger] = useState(null);
    const [continuer, setContinuer] = useState(false);
    const [chooseaction, setchooseaction] = useState(null);
    const [choosetrigger, setchoosetrigger] = useState(null);
    const [actionparams, setactionparams] = useState({});
    const [triggerparams, setriggerparams] = useState({});
    const [name, setName] = useState("");


    
    const PopupCustom = ({ mode }) => {
        const [open, setopen] = useState(false);
        const [data, setdata] = useState([]);

        const bearerToken = localStorage.getItem("token");
        const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/" + mode;
        const url = "http://" + localStorage.getItem("ip") + ":8080";
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
                trigger={<button className="cross-button">{mode === "actions" && action != null ? <img style={{width : 100, height : 100}} src = {url + action.img}></img> : "+" && mode === "triggers" && trigger != null ? <img style={{width : 100, height : 100}} src = {url + trigger.img}></img> : "+"  }</button>}
                position="right center"
                contentStyle={{
                    background: "rgba(255,255,255,1)",
                    height: 400,
                    borderRadius: 10,
                }}
            >
                <div style={{display : 'flex', flexDirection : 'row', gap : 10}}>
                    {Object.values(data).map((val) => {
                        return (
                           
                                <div>
                                    <button onClick={() => {if (mode === "actions"){getAction(val)}else{getTrigger(val)}}} className="block"><img className="chose-node" src = {url + val.img}></img></button>
                                </div>
                          
                        );
                    })}
                </div>
            </Popup>
        );
    };


    const SecondStepWorkflow = () => {
        const url = "http://" + localStorage.getItem("ip") + ":8080";
        useEffect(() => {
        if (action.actions != undefined || action.actions != null) 
            console.log(Object.values(action.actions).find((val) => val.id == chooseaction));   
        }
        , []);
        return(
            <div style={{marginTop : 30, display : 'flex', flexDirection : 'column'}}>
            <div style={{display : 'flex', width : "90%", justifyContent : 'space-between', flexDirection : 'row-reverse'}}>
                
                <div className="arg-container">
                    <div style={{padding : 10, display : 'flex', flexDirection : 'column', justifyContent : 'space-around'}}>
                        <img style={{width : 20, height : 20, alignSelf : 'center'}} src = {url + action.img}></img>
                        <div style ={{marginTop : 20 ,flexDirection : 'column', display : 'flex', justifyContent : 'space-between', maxHeight : 300, minHeight : 200}}>
                            {Object.values(action.actions).find((val) => val.id == chooseaction).params.map((val) => {return(
                                <div>
                                    {val.type === "string" ?
                                    <NominalInputs setVal={setactionparams} Val={actionparams} action = {val}></NominalInputs>
                                    : val.type === "enum" ?
                                    <EqualityInputs setVal={setactionparams} Val={actionparams} action = {val}></EqualityInputs>
                                    : val.type === "boolean" ?
                                    <CheckboxInputs setVal={setactionparams} Val={actionparams} action={val }></CheckboxInputs>
                                    : val.type == "datetime" ?
                                    <DateInputs setVal={setactionparams} Val={actionparams} action={val }></DateInputs>
                                    :
                                    <NumberInputs setVal={setactionparams} Val={actionparams} action={val }></NumberInputs>
                                    }
                                </div>
                        )})}</div>
                    </div>
                </div>
                <span style={{fontSize : 100}}>then</span>
                <div className="arg-container">
                    <div style={{padding : 10, flexDirection : 'column', display : 'flex'}}>
                        <img style={{width : 20, height : 20, alignSelf : 'center'}} src = {url + trigger.img}></img>
                        <div style ={{marginTop : 20, flexDirection : 'column', display : 'flex', justifyContent : 'space-between', maxHeight : 300, minHeight : 200}}>
                            {Object.values(trigger.triggers).find((val) => val.id == choosetrigger).params.map((val) => {return(
                                <div>
                                    {val.type === "string" ?
                                    <NominalInputs setVal={setriggerparams} Val={triggerparams} action = {val}></NominalInputs>
                                    : val.type === "enum" ?
                                    <EqualityInputs setVal={setriggerparams} Val={triggerparams} action = {val}></EqualityInputs>
                                    : val.type === "boolean" ?
                                    <CheckboxInputs setVal={setriggerparams} Val={triggerparams} action={val }></CheckboxInputs>
                                    : val.type == "datetime" ?
                                    <DateInputs setVal={setriggerparams} Val={triggerparams} action={val }></DateInputs>
                                    :
                                    <NumberInputs setVal={setriggerparams} Val={triggerparams} action={val }></NumberInputs>
                                    }
                                </div>
                                
                        )})}</div>
                    </div>
                </div>
                <span style={{fontSize : 100}}>if</span>
               
            </div>
            <button className="nav-b" style={{marginTop : 50, alignSelf : 'center'}} onClick={() => {console.log(action);createWorkflow(action.id + "." + chooseaction, actionparams, trigger.id + "." + choosetrigger, triggerparams, name)}}>create Workflow</button>
            </div>
        );
    }


    const FirstStepWorkflow = () => {
        const [nameintern, setNameintern] = useState(name);
        if (action != null && trigger != null && chooseaction == null && choosetrigger == null){
            setchooseaction(action.actions[0].id);
            setchoosetrigger(trigger.triggers[0].id);
        }
        return(
            <div className="newWorkflow">
                <input
                style={{ width: 150 }}
                placeholder="new workflow name"
                onChange={(e) => {setNameintern(e.target.value)}}
                onBlur={() => {setName(nameintern)}}
                value={nameintern}
            ></input>
            <br></br>
            <div className="workflow-factory">
                <div style={{flexDirection : 'column', display : 'flex'}}>
                    <PopupCustom mode="actions"></PopupCustom>
                    {action != null && trigger != null ? 
                        <label style={{alignSelf : 'center'}}>
                            <select value = {chooseaction} onChange={(val) => {console.log(val.target.value); setchooseaction(val.target.value)}}>
                            {Object.values(action.actions).map((val) => {return(<option value = {val.id}>{val.name}</option>)})}
                            </select>
                        </label> : <></>}
                </div>
                <div className="cross">
                    <span style={{ fontSize: 90 }}>{"--->"}</span>
                    <span style={{ fontSize: 90 }}>{"<---"}</span>
                </div>
                <div style={{flexDirection : 'column', display : 'flex'}}>
                <PopupCustom mode="triggers"></PopupCustom>
                {action != null && trigger != null ? 
                    <label style={{alignSelf : 'center'}}>
                        <select value = {choosetrigger} onChange={(val) => {console.log(val.target.value); setchoosetrigger(val.target.value)}}>
                            {Object.values(trigger.triggers).map((val) => {return(<option value = {val.id}>{val.name}</option>)})}
                        </select>
                    </label> : <></>}
                </div>
                
            </div>
            { action != null && trigger != null ?
            <button className="nav-b" style={{alignSelf : "center", marginTop : 30}}  onClick={() => {name != "" ? setContinuer(true) : window.alert("you must set a name to continue")}}>continue</button> : <></>
            }
            </div>


        );
    }

    return (
        <div className="newWorkflow">
           {continuer === false ?
            <FirstStepWorkflow/> : <SecondStepWorkflow/>}
        </div>
    );
};

export const ChangeEnabledWorkflow = async (id, val) => {
    const bearerToken = localStorage.getItem("token");
    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/flows/" + id;
    const axiosConfig = {
            method: "put",
            url: apiUrl,
            data : {enabled : val},
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
        };
        axios(axiosConfig)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

}



export const Getflows = () => {
    const [data, setdata] = useState([]);
    const [checked, setchecked] = useState(false);
    const bearerToken = localStorage.getItem("token");
    const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/flows";
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
            setdata(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [checked]);


    return(

        <div>
            {data.map((val) => {return(
            <div className="workflow-get">
                <p style={{color : 'grey', fontWeight : 'bold'}}>{val.name}</p>
                <p style={{fontWeight : 'bold'}}>{val.action.id.split(".")[0]} {val.action.id.split(".")[1].replace("_", " ")}</p>
                <p style={{fontWeight : 'bold'}}>{"-->"}</p>
                <p style={{fontWeight : 'bold'}}>{val.trigger.id.split(".")[0]} {val.trigger.id.split(".")[1].replace("_", " ")}</p>
                <Switch
                    checked={val.enabled}
                    onChange={(e) => {setchecked((e) => !e);ChangeEnabledWorkflow(val._id, e.target.checked)}}
                />
            {/* <p>{val.name} {val.action.id} triggers : {val.trigger.id}</p> */}
            </div>)})}
        </div>
    )

}

export const Workflowpage = () => {
    const [switchWorkflow, setSwitchWorkflow] = useState(true);
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
                <button
                    onClick={() => {
                        gitlab_connexion();
                    }}
                >
                    gitlab
                </button>
                <button
                    onClick={() => {
                        spotify_connexion();
                    }}
                >
                    Spotify
                </button>
                <button
                    onClick={() => {
                        google_connexion();
                    }}
                >
                    Google
                </button>
            </div>
            <div className="workflowstation">
                <div className="navigation-button">
                    <button className="nav-b" onClick={() => {setSwitchWorkflow(true)}}>new workflow</button>
                    <button className="nav-b"  onClick={() => {setSwitchWorkflow(false)}}>my workflow</button>
                </div>

                {     switchWorkflow ?
                      <NewWorkflow></NewWorkflow> : 
                      <Getflows></Getflows>
                }
            </div>
        </div>
    );
};
