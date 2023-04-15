import { History } from "../../types/session";

const TIMEOUT = 1000 * 60 * 5;

const userHistory = new Map<string, {timeout: NodeJS.Timeout, history: History}>();

const endSession = (userId: string) => {
    userHistory.delete(userId);
};

const resetSession = (userId: string) => {
    const userSession = userHistory.get(userId);

    if(!userSession) return;

    clearTimeout(userSession.timeout);

    userSession.timeout = setTimeout(() => {
        endSession(userId);
    }, TIMEOUT);
};

const startSession = (userId: string) => {
    
    const timeout = setTimeout(() => {
        endSession(userId);
    }, TIMEOUT);
    
    userHistory.set(userId, { timeout, history: [] });

    const userSession = userHistory.get(userId);

    return userSession;

};

export const session = {
    userHistory,
    startSession,
    resetSession,
};