import {type ChatInputCommandInteraction} from "discord.js";
import { gamePriceSession } from "../session/gamePriceSession";


export const gamePriceCommand = async (interaction: ChatInputCommandInteraction) => {


    const game = interaction.options.getString("game-name") ?? "";
    const price = interaction.options.getNumber("price") ?? Infinity;


    try{
        await interaction.deferReply();
        gamePriceSession.startSession(interaction.user.id);

        let reply = "";
        let found: number | undefined;
        try{
            found = await gamePriceSession.addGameToSession(interaction.user.id, game, price);
        }catch(err){
            reply = `The game "${game}" was not found`;
        }
        
        if(found && found > price){
            reply = `The price of ${game} is ${found}€. You will be notified when it is lower than ${price}€`;
        }
        
        interaction.editReply(reply);
    }
    catch(err: unknown){
        if(err instanceof Error){
            console.error(err.message);    
            await interaction.editReply(err.message);
        }
        else {
            console.error(err);
            await interaction.editReply("An error occurred");
        }
    }
    
};