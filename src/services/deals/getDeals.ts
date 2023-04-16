import { JSDOM } from "jsdom";
import { Game } from "../../types/game";

export const getDeals = async (dealType: number) => {
    
    const response = await fetch("https://gg.deals/");
    const htmlString = await response.text();
    const DOM = new JSDOM(htmlString);

    const deals = DOM.window.document.querySelector(`#deals-presets > div > div > div:nth-child(${dealType}) > div`)?.children;

    if(!deals) return;

    const games: Game[] =[];

    for (const game of deals) {   
         
        games.push({
            name: game.querySelector(".title")?.innerHTML ?? "",
            URL: "https://gg.deals"+ game.querySelector(".title")?.getAttribute("href") ?? "",
            Price: game.querySelector(".price-inner.numeric")?.innerHTML ?? ""
        });
    }

    return games;
};