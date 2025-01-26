import ENV from "../config/env";

export async function auth({request}) {
    const response = await request.post(`${ENV.PARTNER_API_GATEWAY_URL}/authentication/token`, {
        data: {
            "clientId": ENV.CLIENT_ID,
            "clientSecret": ENV.CLIENT_SECRET,
        },
    });
    return JSON.parse(await response.text()).idToken;
}

export function generateRandomDate(from, to) {
    return new Date(
        from.getTime() + Math.random() * (to.getTime() - from.getTime()),
    );
}