import { Events, Client } from "discord.js";
import { ready, answerMessage} from "./handlers";
import { intents } from "./config/intents";
import { welcomeMessage } from "./handlers/messages/welcomeMessageHandler";

const token = process.env.BOT_TOKEN;

export const initClient = () => {

    const client = new Client({intents});

    // Once the client is logged in
    client.on(Events.ClientReady, ready(client));

    client.on(Events.GuildMemberAdd,welcomeMessage(client));

    // Answer to messages
    client.on(Events.MessageCreate, answerMessage(client));

    // Login bot with token
    client.login(token);
};