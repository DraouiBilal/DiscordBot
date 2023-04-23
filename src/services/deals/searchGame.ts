import { Game } from "../../types/game";
import { DOMParser } from "../DOMParser/DOMParser";
import {type JSDOM} from "jsdom";

export const searchGame = async (game: string) => {

    let DOM: JSDOM | null = null;
    const games: Game[] = [];

    try {
        DOM = await DOMParser(`https://gg.deals/games/?title=${game}`);
    }
    catch (err: unknown) {

        if (err instanceof Error)
            console.error(err.message);

        else
            console.error(err);
    }

    if(!DOM) throw new Error("No game found");

    const deals = DOM.window.document.querySelector("#games-list .list-items")?.children;

    if (!deals) return;

    for (const game of deals) {
        games.push({
            name: game.querySelector(".game-info-title-wrapper a")?.textContent ?? "",
            URL: "https://gg.deals" + game.querySelector("a.full-link")?.getAttribute("href") ?? "",
            Price: game.querySelector(".shop-price-retail .price-inner.numeric")?.innerHTML ?? "",
            ImageURL: game.querySelector(".game-picture img")?.getAttribute("src") ?? ""
        });
    }

    return games;
};