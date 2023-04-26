import { getGamePrice } from "../deals/getGamePrice";
import client from "../../client";
import prisma from "../../db/prismaClient";


const INTERVAL = 1000 * 60 * 60 * 24;


let interval: NodeJS.Timer | null = null;

const startSession = () => {
    if (interval) return;

    interval = setInterval(async () => {
        const userGamesHistory = await prisma.gamePriceHistory.findMany();
        
        await Promise.all(userGamesHistory.map(async (game) => {
            const onlinePrice = await getGamePrice(game.game);

            if (onlinePrice > game.price) {
                return;
            }
            
            client.users.fetch(game.userId).then((user) => {
                user.send(`The price of ${game.game} is now ${onlinePrice}€. Go get it!`);
                prisma.gamePriceHistory.delete({
                    where: {
                        id: game.id
                    }
                });
            });
            return game;
        }));

    }, INTERVAL);
};

const addGameToSession = async (userId: string, game: string, price: number) => {
    let timeout: NodeJS.Timer | null = null;
    let duration = 1;
    try {
        await prisma.gamePriceHistory.create({
            data: {
                game,
                price,
                userId,
                createdAt: new Date()
            }
        });
        if (timeout)
            clearTimeout(timeout);
    } catch (err) {
        timeout = setTimeout(() => {
            duration *= 2;
            addGameToSession(userId, game, price);
        }, duration * 1000);
    }
};

export const gamePriceSession = {
    startSession,
    addGameToSession
};
