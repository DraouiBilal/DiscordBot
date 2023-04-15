import {type ChatInputCommandInteraction} from "discord.js";

export const sudoCommand = async (interaction:ChatInputCommandInteraction)=>{
    
    if(!interaction.guild) return;

    const memebrs = (await interaction.guild.members.fetch()).map(member => member);
    
    const sudoIndex = Math.floor(Math.random()*(memebrs.length));

    interaction.reply(`The sudo of the day is ${memebrs[sudoIndex]}`);
};