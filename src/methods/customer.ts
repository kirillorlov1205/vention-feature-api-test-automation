import {BASE_URL, CONTACT_WITH_EMPTY_EMAILS_AND_PHONES, STORE_REFERENCE_1A} from "../data/constants";

export async function getCustomerById({request}, authToken, customerId) {
    return await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${customerId}`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    });
}

export async function getCustomerListByDate({request}, authToken, startDate, endDate, offset) {
    return await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/list`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }, params: {
            "dateStart": startDate,
            "dateEnd": endDate,
            "offset": offset,
        },
    });
}

export async function updateCustomerContact({request}, authToken, customerId, body) {
    return await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${customerId}/contact`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }, data: body
    });
}

export async function removeCustomerContact({request}, authToken, customerId) {
    return await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${customerId}/contact`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }, data: CONTACT_WITH_EMPTY_EMAILS_AND_PHONES
    });
}