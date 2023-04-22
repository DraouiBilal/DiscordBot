import { Events, Client } from "discord.js";
import { ready, answerMessage, commandsHandler, guildCreateHandler} from "./handlers";
import { intents } from "./config/intents";
import { welcomeMessage } from "./handlers/messages/welcomeMessageHandler";

const token = process.env.BOT_TOKEN;

const client = new Client({intents});

export const initClient = async () => {


    // Once the client is logged in
    client.on(Events.ClientReady, ready);

    // Set commands in guild
    client.on(Events.GuildCreate, guildCreateHandler);

    // Give welcome message
    client.on(Events.GuildMemberAdd, welcomeMessage);

    // Answer commands
    client.on(Events.InteractionCreate, commandsHandler);

    // Answer to messages
    client.on(Events.MessageCreate, answerMessage);

    // Login bot with token
    await client.login(token);

    return client;
};

export default client;