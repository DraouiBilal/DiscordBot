import { DOMParser } from "../DOMParser/DOMParser";
import { type JSDOM } from "jsdom";

export const getGamePrice = async (game: string) => {

    let DOM: JSDOM | null = null;

    try {
        DOM = await DOMParser(`https://gg.deals/game/${game.split(" ").join("-")}`);
    }
    catch (err: unknown) {

        if (err instanceof Error)
            console.error(err.message);
        else
            console.error(err);
    }

    if (!DOM)
        throw new Error("Game not found");

    const priceElement = DOM.window.document.querySelector(".game-info-price-col span.price-inner");
    
    if (!priceElement || !priceElement.textContent)
        throw new Error("Price not found");
    
    const price = parseFloat(priceElement.textContent.replace(",", ".").replace("~", ""));

    return price;
};