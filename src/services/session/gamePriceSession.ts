import { getGamePrice } from "../deals/getGamePrice";
import client from "../../client";


const INTERVAL = 1000 * 2;

const userGamePrice = new Map<string, { game: string, price: number }[]>();


const endSession = (userId: string) => {
    userGamePrice.delete(userId);
};


setInterval(() => {
    userGamePrice.forEach(async (value, key) => {
        await Promise.all(value.map(async (game) => {
            const onlinePrice = await getGamePrice(game.game);

            if (onlinePrice > game.price) {
                return;
            }
            client.users.fetch(key).then((user) => {
                user.send(`The price of ${game.game} is now ${onlinePrice}€. Go get it!`);
            });
            value.splice(value.indexOf(game), 1);
            endSession(key);

            return game;
        }));

    });
}, INTERVAL);

const startSession = (userId: string) => {
    const userSession = userGamePrice.get(userId);

    if(userSession){
        return;
    }

    userGamePrice.set(userId, []);
};

const addGameToSession = async (userId: string, game: string, price: number) => {
    const userSession = userGamePrice.get(userId);

    if(!userSession){
        return;
    }
    
    const found = await getGamePrice(game);
   
    if(found > price)
        userSession.push({ game, price });
   
    return found;
};

export const gamePriceSession = {
    userGamePrice,
    startSession,
    addGameToSession
};
