import { JSDOM } from "jsdom";

export const DOMParser = async (URL: string) => {

    const response = await fetch(URL);

    if(!response.ok) throw new Error (URL+" Unvailable right now please try again later");

    const htmlString = await response.text();
    const DOM = new JSDOM(htmlString);
    
    return DOM;
};