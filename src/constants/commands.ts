import { SlashCommandBuilder } from "discord.js";

export const commands =[
    new SlashCommandBuilder()
        .setName("sudo")
        .setDescription("Guess who is gay today"),

    new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Talk with the bot")
        .addStringOption(option => option.setName("message").setDescription("The message to send to the bot").setRequired(true)),

    new SlashCommandBuilder()
        .setName("game-deals")
        .setDescription("Get latest games deal")
        .addStringOption(option => 
            option.setName("deals-type")
            .setDescription("Chose the type of the deal")
            .setRequired(true)
            .addChoices(
                {name: "best-deals", value: "bestDeals"},
                {name: "new-deals", value: "newDeals"},
                {name: "historical-low-deals", value: "historicalLow"}
            )),

    new SlashCommandBuilder()
        .setName("game-price")
        .setDescription("Get notified when a game price is lower than a specific price")
        .addStringOption(option =>
            option.setName("game-name")
            .setDescription("The name of the game that you want to be notified")
            .setRequired(true))
        .addNumberOption(option =>
            option.setName("price")
            .setDescription("The price to be notified")
            .setRequired(true))
            
];