import {type GuildMember, type Client, TextChannel } from "discord.js";

export const welcomeMessage = (client:Client)=>async (memeber:GuildMember)=>{

    //fetch the general channel by it ID
    let general: TextChannel | null = null;

    client.channels.cache.forEach((channel) => {
        if(channel instanceof TextChannel && channel.name === "general") {
            general = channel;
            general.send(`welcome ${memeber.user} be careful drale is sudo`);
        }
    });
};