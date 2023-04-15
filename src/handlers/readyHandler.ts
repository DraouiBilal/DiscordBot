import { type Client } from "discord.js";

export const ready = (client: Client) => async () => {
    if (!client.user) return;
    console.log(`Logged in as ${client.user.tag}!`);
    
};