import { useParams } from "react-router-dom"
import { github_connexion, google_connexion, spotify_connexion} from "../WorkflowPages/workflowpage";
import { useEffect } from "react";

export const Frontmobile = () => {
    const { token, service, ip } = useParams();

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("ip", ip);
        if (service == "google")
            google_connexion();
        else if (service == "spotify")
            spotify_connexion();
        else if (service == "github")
            github_connexion();
    }, []);

    return(
        <text>{token}, {service}, {ip}</text>

    );
}