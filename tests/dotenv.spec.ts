import {test} from "@playwright/test";
import ENV from "../src/utils/env"

let authToken = "";

test("",async ({request}) => {
    console.log(ENV.CLIENT_ID);
    console.log(ENV.CLIENT_SECRET);
});