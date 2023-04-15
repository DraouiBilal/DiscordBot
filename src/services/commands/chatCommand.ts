import {type ChatInputCommandInteraction} from "discord.js";
import chatSonic from "../chatsonic/chatsonic";
import { session } from "../session/session";

export const chatCommand = async (interaction: ChatInputCommandInteraction) => {
    
    if(!interaction.guild) return;

    interaction.deferReply();

    const message = interaction.options.getString("message") ?? "";

    let response = "Unfortunately, I can't talk at the moement.";

    let userSession = session.userHistory.get(interaction.user.id);

    !userSession ? userSession = session.startSession(interaction.user.id) : session.resetSession(interaction.user.id);

    try {
        response = await chatSonic(message, userSession?.history ?? []);

        userSession?.history.push({ is_sent: true, message });
        userSession?.history.push({ is_sent: false, message: response });

    } catch (err: unknown) {
        if(err instanceof Error)
            console.error(err.message);
        else
            console.error(err);
    }

    interaction.editReply(response);
};