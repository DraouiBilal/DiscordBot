import client from "../client";

export const ready = async () => {
    if (!client.user) return;
    console.log(`Logged in as ${client.user.tag}!`);
    
};