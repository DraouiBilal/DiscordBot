import api from "api";
import { History } from "../../types/session";

const sdk = api("@writesonic/v2.2#4enbxztlcbti48j");

sdk.auth(process.env.CHATSONIC_API_KEY);

const chatSonic = async (text: string, history: History) => {
    
    const res: {data: {message: string}} = await sdk.chatsonic_V2BusinessContentChatsonic_post({
        enable_google_results: true,
        enable_memory: true,
        input_text: text,
        history_data: history
    }, { engine: "premium" });
    
    return res.data.message;
};

export default chatSonic;