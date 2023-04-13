import { config } from "dotenv";
config();

import { checkENV } from "./utils/checkENV";
checkENV();

import { initClient } from "./client";
initClient();
