import {type Client, type Guild} from "discord.js";
import { commands } from "../../constants/commands";


export const guildCreateHandler = (guild:Guild) => {

    guild.commands.set(commands);
};