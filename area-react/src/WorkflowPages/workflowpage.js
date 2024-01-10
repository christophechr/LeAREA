import { LogoutUser } from "../loginPages/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/workflowpage.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CheckboxInputs, EqualityInputs, NominalInputs, NumberInputs } from "../Utils/Inputs";

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
            "params" : {"name" : actionparams.name}
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
    const [chooseaction, setchooseaction] = useState("new_repo");
    const [choosetrigger, setchoosetrigger] = useState("temperature");
    const [actionparams, setactionparams] = useState({});
    const [triggerparams, setriggerparams] = useState({});
    const [name, setName] = useState("");
    const PopupCustom = ({ mode }) => {
        const [open, setopen] = useState(false);
        const [data, setdata] = useState([]);

        const bearerToken = localStorage.getItem("token");
        const apiUrl = "http://" + localStorage.getItem("ip") + ":8080/" + mode;
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
                trigger={<button className="cross-button">{mode === "actions" && action != null ? action.name : "+" && mode === "triggers" && trigger != null ? trigger.name : "+"  }</button>}
                position="right center"
                contentStyle={{
                    background: "rgba(255,255,255,1)",
                    height: 400,
                    borderRadius: 10,
                }}
            >
                <div>
               
                    {Object.values(data).map((val) => {
                    
                        return <button onClick={() => {if (mode === "actions"){getAction(val)}else{getTrigger(val)}}} className="block">{val.name}</button>;
                    })}
                </div>
            </Popup>
        );
    };


    const SecondStepWorkflow = () => {
        useEffect(() => {
            console.log(trigger.triggers[0].params);
        }
        , []);
        return(
            <div>
            <div style={{display : 'flex', width : "90%", justifyContent : 'space-between'}}>
                <div>
                    <span>{action.name}</span>
                    <div style ={{flexDirection : 'column', display : 'flex', justifyContent : 'space-between', maxHeight : 300, minHeight : 200}}>
                        {action.actions[0].params.map((val) => {return(
                            <div>
                                 {val.type === "string" ?
                                <NominalInputs setVal={setactionparams} Val={actionparams} action = {val}></NominalInputs>
                                : val.type === "enum" ?
                                <EqualityInputs setVal={setactionparams} Val={actionparams} action = {val}></EqualityInputs>
                                : val.type === "boolean" ?
                                <CheckboxInputs setVal={setactionparams} Val={actionparams} action={val }></CheckboxInputs>
                                : <NumberInputs setVal={setactionparams} Val={actionparams} action={val }></NumberInputs>
                                }
                            </div>
                    )})}</div>
                </div>

                <div>
                    <span>{trigger.name}</span>
                    <div style ={{flexDirection : 'column', display : 'flex', justifyContent : 'space-between', maxHeight : 300, minHeight : 200}}>
                        {trigger.triggers[0].params.map((val) => {return(
                            <div>
                               {val.type === "string" ?
                                <NominalInputs setVal={setriggerparams} Val={triggerparams} action = {val}></NominalInputs>
                                : val.type === "enum" ?
                                <EqualityInputs setVal={setriggerparams} Val={triggerparams} action = {val}></EqualityInputs>
                                : val.type === "boolean" ?
                                <CheckboxInputs setVal={setriggerparams} Val={triggerparams} action={val }></CheckboxInputs>
                                : <NumberInputs setVal={setriggerparams} Val={triggerparams} action={val }></NumberInputs>
                                }
                            </div>
                    )})}</div>
                </div>
               
            </div>
            <button className="nav-b" style={{marginTop : 30, alignSelf : 'center'}} onClick={() => {console.log(action);createWorkflow(action.id + "." + chooseaction, actionparams, trigger.id + "." + choosetrigger, triggerparams, name)}}>create Workflow</button>
            </div>
        );
    }


    const FirstStepWorkflow = () => {
        const [nameintern, setNameintern] = useState(name);
        if (action != null && trigger != null){
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
                        <label>choisiez une actions
                            <select value = {chooseaction} onChange={(val) => {setchooseaction(val.target.value)}}>
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
                    <label>choisiez une reactions
                        <select value = {choosetrigger} onChange={(val) => {setchoosetrigger(val.target.value)}}>
                            {Object.values(trigger.triggers).map((val) => {return(<option value = {val.id}>{val.name}</option>)})}
                        </select>
                    </label> : <></>}
                </div>
                
            </div>
            { action != null && trigger != null ?
            <button className="nav-b" style={{alignSelf : "center", marginTop : 30}}  onClick={() => {setContinuer(true)}} disabled = {name === ""}>continue</button> : <></>
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



export const Getflows = () => {
    const [data, setdata] = useState([]);
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
    }, []);


    return(

        <div>
            {data.map((val) => {return(<p>name : {val.name} actions : {val.action.id} triggers : {val.trigger.id}</p>)})}
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
