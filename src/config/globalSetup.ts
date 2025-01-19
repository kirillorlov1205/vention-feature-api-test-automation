import { FullConfig } from "@pLaywright/test";
// @ts-ignore
import dotenv from "dotenv"

async function globalSetup(config: FullConfig) {
    if (process.env.test_env) {
        dotenv.config({
            path: `src/config/env/.env.${process.env.test_env}`,
            override: true,
        })
    }
}
export default globalSetup;