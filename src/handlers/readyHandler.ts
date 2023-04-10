import { Client } from "discord.js";

export const ready = (client: Client) => () => {
    if (!client.user) return;

    console.log(`Logged in as ${client.user.tag}!`);
}

const a = () => 5;