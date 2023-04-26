import {ChannelType, EmbedBuilder, type ChatInputCommandInteraction} from "discord.js";
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
                reply = "# Best deals \nGet the best deals available right now";
            }    
            break;

            case "newDeals":{
                deals = await getDeals(dealsType.newDeals) ?? [];
                reply = "# New deals \nGet the newest deals";
            }
            break;

            case "historicalLow":{
                deals = await getDeals(dealsType.historicalLow) ?? [];
                reply = "# Historical low deals \nGet the game with the lowest recorded prices";
            }
            break;

            default:
                deals=[];
                reply = "This deal does not exist !";
                break;
        }
        
        const messageList =[ ];

        for (const game of deals) {
            const embededMessage = new EmbedBuilder()
                .setColor("Red")
                .setTitle(game.name)
                .setDescription("Price: "+game.Price+"\n"+game.URL)
                .setThumbnail(game.ImageURL);
            messageList.push(embededMessage);
        }

        let channel = interaction.guild?.channels.cache.find(channel => channel.name === "game-deals");
        if(!(channel && channel.type === ChannelType.GuildText)){
            channel = await interaction.guild?.channels.create({name:"game-deals",type: ChannelType.GuildText});
            
        }

        channel?.send({content: reply, embeds: messageList });

        await interaction.editReply("Let see what we got!");
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