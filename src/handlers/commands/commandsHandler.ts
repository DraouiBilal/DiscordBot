import {type Interaction, type Client} from "discord.js";
import { sudoCommand } from "../../services/commands/sudoCommand";

export const commandsHandler = (client:Client) => async (interaction:Interaction) =>{

    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName==="sudo") sudoCommand(interaction);


};