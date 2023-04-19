import { Game } from "../../types/game";
import { DOMParser } from "../DOMParser/DOMParser";

export const getDeals = async (dealType: number) => {
    
    const games: Game[] =[];

    try {

        const DOM = await DOMParser("https://gg.deals/");

        const deals = DOM.window.document.querySelector(`#deals-presets > div > div > div:nth-child(${dealType}) > div`)?.children;

        if(!deals) return;

        for (const game of deals) {   
            games.push({
                name: game.querySelector(".title")?.innerHTML ?? "",
                URL: "https://gg.deals"+ game.querySelector(".title")?.getAttribute("href") ?? "",
                Price: game.querySelector(".price-inner.numeric")?.innerHTML ?? ""
            });
        }

    }
    catch (err: unknown){

        if(err instanceof Error)
            console.error(err.message);

        else
            console.error(err);
    }

    return games;
};