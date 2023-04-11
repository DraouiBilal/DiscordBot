import { env } from "../config/env";

export const checkENV = () => {

    const missing = env.filter((envVar) => !process.env[envVar]);

    if (missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
};