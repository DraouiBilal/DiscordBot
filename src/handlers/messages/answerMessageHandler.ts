import { type Client, type Message } from "discord.js";
import chatSonic from "../../services/chatsonic/chatsonic";

export const answerMessage = (client: Client) => async (message: Message) => {
    if(message.author.bot) return;
    if(!message.mentions.members?.find((member) => member.id === client.user?.id)) return;
    

    let response = "Unfortyunately, I can't access the dialogue API at the moment.";
    try {
        response = await chatSonic(message.content);
    } catch (err: unknown) {
        if(err instanceof Error)
            console.error(err.message);
        else
            console.error(err);
    }
    message.reply(response);
};