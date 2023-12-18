
import { useEffect } from "react";


export const Github = () => {

    useEffect(() => {
        const currentUrl = window.location.href;
        console.log(currentUrl);
        const code = currentUrl.split("=")[1];
        console.log(code);
    });

    return(
        <div>
            <span>you will be redirected in 5 sec ...</span>
        </div>

    )

};