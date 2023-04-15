import {type ChatInputCommandInteraction} from "discord.js";
import chatSonic from "../chatsonic/chatsonic";

export const chatCommand = async (interaction: ChatInputCommandInteraction) => {
    
    if(!interaction.guild) return;

    const message = interaction.options.getString("message") ?? "";

    let response = "Unfortunately, I can't talk at the moement.";
    try {
        response = await chatSonic(message);
    } catch (err: unknown) {
        if(err instanceof Error)
            console.error(err.message);
        else
            console.error(err);
    }

    interaction.reply(response);
};