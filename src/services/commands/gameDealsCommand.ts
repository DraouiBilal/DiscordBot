import {type ChatInputCommandInteraction} from "discord.js";
import { getDeals } from "../deals/getDeals";
import { dealsType } from "../../types/dealsType";
import { Game } from "../../types/game";


export const gameDealsCommand = async (interaction: ChatInputCommandInteraction) => {

    let deals: Game[] = [];

    const dealOption = interaction.options.getString("deals-type") ?? "";

    let reply: string;

    try{
        
        await interaction.deferReply();

        switch (dealOption) {

            case "bestDeals":{
                deals = await getDeals(dealsType.bestDeals) ?? [];
                reply = "**Best deals**";
            }    
            break;

            case "newDeals":{
                deals = await getDeals(dealsType.newDeals) ?? [];
                reply = "**New deals**";
            }
            break;

            case "historicalLow":{
                deals = await getDeals(dealsType.historicalLow) ?? [];
                reply = "**Historical low deals**";
            }
            break;

            default:
                reply = "This deal does not exist !";
                break;
        }
        
    
        for (const game of deals) {
            reply += "\n**Game: **" + game.name + "\n" + "**Price: **" + game.Price + "\n" + "**URL: **"+ game.URL +"\n";
        }

        await interaction.editReply(reply);
    }

    catch(err: unknown){
        if(err instanceof Error){
            console.error(err.message);    
        }
        else {
            console.error(err);
        }
    }
    
};