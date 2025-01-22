import {BASE_URL, CUSTOMER_ID, STORE_REFERENCE_1A} from "../data/constants";

export async function subscribeToCommunication({request}, authToken, subscriptionSettings) {
    const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/subscribe`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
        data: subscriptionSettings
    });
    return response;
}

export async function unsubscribeToCommunication({request}, authToken, subscriptionSettings) {
    const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/unsubscribe`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
        data: subscriptionSettings
    });
    return response;
}