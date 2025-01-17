import ENV from "../utils/env";

export class Helpers {
    static auth = async ({request}) => {
        const response = await request.post(`${ENV.PARTNER_API_GATEWAY_URL}/authentication/token`, {
            data: {
                "clientId": ENV.CLIENT_ID,
                "clientSecret": ENV.CLIENT_SECRET,
            },
        });
        return await JSON.parse(await response.text()).idToken;
    }
}

