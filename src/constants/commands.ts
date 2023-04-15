import { SlashCommandBuilder } from "discord.js";

export const commands =[
    new SlashCommandBuilder()
        .setName("sudo")
        .setDescription("Guess who is gay today"),
    new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Talk with the bot")
        .addStringOption(option => option.setName("message").setDescription("The message to send to the bot").setRequired(true))
];