import { type Client, type Message } from "discord.js";
import client from "../../client";

export const answerMessage = async (message: Message) => {
    if(message.author.bot) return;
    if(!message.mentions.members?.find((member) => member.id === client.user?.id)) return;
    message.reply("Hello, I'm Pro_Gamer, I can help you with your problems, just type /help to see my commands.");
};