import { useParams } from "react-router-dom"
import { github_connexion, google_connexion, spotify_connexion} from "../WorkflowPages/workflowpage";
import { useEffect } from "react";

export const Frontmobile = () => {
    const { token, service, ip, http } = useParams();

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("ip", ip);
        localStorage.setItem("http", http);
        if (service == "google")
            google_connexion(http);
        else if (service == "spotify")
            spotify_connexion(http);
        else if (service == "github")
            github_connexion(http);
    }, []);

    return(
        <text>{token}, {service}, {ip}</text>

    );
}