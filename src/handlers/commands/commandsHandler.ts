import {type Interaction, type Client} from "discord.js";
import { sudoCommand } from "../../services/commands/sudoCommand";
import { chatCommand } from "../../services/commands/chatCommand";

export const commandsHandler = (client:Client) => async (interaction:Interaction) =>{
    
    if(!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "sudo":
            await sudoCommand(interaction);
            break;
        case "chat":
            await chatCommand(interaction);
            break;
        default:
            interaction.reply("This command is not yet implemented.");
            break;
    }

};