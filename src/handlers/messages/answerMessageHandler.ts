import { type Client, type Message } from "discord.js";

export const answerMessage = (client: Client) => async (message: Message) => {
    if(message.author.bot) return;

    if(message.content === "ping") {
        message.reply("pong");
    }
};