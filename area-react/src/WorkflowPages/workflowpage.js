import { LogoutUser } from "../loginPages/login";
import { useNavigate } from "react-router-dom";

export const Workflowpage = () => {
    const navigation = useNavigate();

    return(
        <div>
        <div>hey</div>
        <button onClick={() => {LogoutUser(); navigation("/login")}}>logout</button>
        </div>
    );
}