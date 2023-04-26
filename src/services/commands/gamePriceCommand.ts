import { EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import { gamePriceSession } from "../session/gamePriceSession";
import { searchGame } from "../deals/searchGame";
import { getGamePrice } from "../deals/getGamePrice";


export const gamePriceCommand = async (interaction: ChatInputCommandInteraction) => {

    const game = interaction.options.getString("game-name") ?? "";
    const price = interaction.options.getNumber("price") ?? Infinity;
    const messageList = [];

    try {
        await interaction.deferReply();

        let reply = "";
        let found: number | undefined;
        try {
            found = await getGamePrice(game);
        } catch (err) {
            reply = `The game "${game}" was not found, here are the possible answers:`;
            try {
                const games = await searchGame(game);
                if (!games) {
                    interaction.editReply("No game found");
                    return;
                }

                for (const game of games.slice(0, 10)) {
                    const embededMessage = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle(game.name)
                        .setDescription("Price: " + game.Price + "\n" + game.URL)
                        .setThumbnail(game.ImageURL);
                    messageList.push(embededMessage);
                }
                interaction.editReply({ content: reply, embeds: messageList });
                return;
            } catch (err) {
                reply = "The game provider is not available, please try again later";
            }
        }
        
        found?  
            found > price?
                (reply = `The price of ${game} is ${found}€. You will be notified when it is lower than ${price}€`) && gamePriceSession.addGameToSession(interaction.user.id, game, price):
                reply = `The price of ${game} is ${found}€. Go get it!`
                :
            reply = "No game found";

        interaction.editReply(reply);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            await interaction.editReply(err.message);
        }
        else {
            console.error(err);
            await interaction.editReply("An error occurred");
        }
    }
};