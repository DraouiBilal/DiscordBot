import {type Interaction, type Client} from "discord.js";
import { sudoCommand } from "../../services/commands/sudoCommand";
import { chatCommand } from "../../services/commands/chatCommand";
import { gameDealsCommand } from "../../services/commands/gameDealsCommand";
import { gamePriceCommand } from "../../services/commands/gamePriceCommand";
import { downloadVideoCommand } from "../../services/commands";

export const commandsHandler = async (interaction:Interaction) =>{
    
    if(!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "sudo":
            await sudoCommand(interaction);
            break;

        case "chat":
            await chatCommand(interaction);
            break;

        case "game-deals":
            await gameDealsCommand(interaction);
            break;

        case "game-price":
            await gamePriceCommand(interaction);
            break;
        
        case "download-video":
            await downloadVideoCommand(interaction);
            break;

        default:
            console.log(interaction.commandName);
            interaction.reply("This command is not yet implemented.");
            break;
    }

};