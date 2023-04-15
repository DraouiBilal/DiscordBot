import {type SlashCommandBuilder, type Guild} from "discord.js";

export const createCommands = (guild: Guild, commands: SlashCommandBuilder[])=>{

    if (!guild) return;
    guild.commands.set(commands);
    console.log(`Slash commands registered for guild ${guild.name}`);
    
};