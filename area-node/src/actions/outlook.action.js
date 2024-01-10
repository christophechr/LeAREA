import axios, { AxiosError } from "axios";
import { createMimeMessage } from "mimetext";
import { getMailFromToken, getUserFromToken } from "~/areas/microsoft/utils";

const sendMail = {
    serviceName: 'outlook',
    description: "Send a mail from the outlook's mailbox",
    name: "sendMail",
    paramTypes: {
        'recipient': 'string',
        'object': 'string',
        'body': 'string'
    },
    async launch(params, token) {
        console.log("sending mail...")
        const msg = createMimeMessage()
        let mail
        let user
        try {
            mail = await getMailFromToken(token)
            user = await getUserFromToken(token)
            console.log(mail)
        } catch (e) {
            if (!e.response)
                throw e
        }
        msg.setSender({name: user, addr: mail})
        msg.setRecipient(params.recipient)  
        msg.setSubject(params.object)
        msg.setMessage('text/plain', params.body)
        console.log(msg)
        console.log(msg.asEncoded())
        await axios.post("https://graph.microsoft.com/v1.0/me/sendMail",
        msg.asRaw(), {
            headers: {
                'Content-Type': 'message/rfc822',
                'Authorization': 'Bearer ' + token
            }
        })
    }
}

export default sendMail