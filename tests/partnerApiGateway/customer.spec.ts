import {expect, test} from "@playwright/test";
import {BASE_URL, CUSTOMER_ID, STORE_REFERENCE_1A, VALID_CUSTOMER} from "../../src/support/constants";
import ENV from "../../src/utils/env"
import {Helpers} from "../../src/support/helpers";

let authToken = "";

test.beforeAll(async ({request}) => {
    const response = await request.post(`${ENV.PARTNER_API_GATEWAY_URL}/authentication/token`, {
        data: {
            "clientId": ENV.CLIENT_ID,
            "clientSecret": ENV.CLIENT_SECRET,
        },
    });
    authToken = Helpers.auth()
});

test.describe("Update customer", () => {

    test("I can update customer by id", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: VALID_CUSTOMER,
        });
        expect(response.status()).toBe(200);
    });

    test("I can update customer contact", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/contact`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: {
                "emails": VALID_CUSTOMER.customer.emails,
                "phones": VALID_CUSTOMER.customer.phones,
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.customer.emails.length).toBe(VALID_CUSTOMER.customer.emails.length);
        expect(responseBody.customer.phones.length).toBe(VALID_CUSTOMER.customer.phones.length);
        expect(response.status()).toBe(200);
    });
});

test.describe("Get customer", () => {

    test.only("I can get customer by id", async ({request}) => {
        const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.customerInfo.firstName).toEqual(VALID_CUSTOMER.customer.firstName);
    });

    test("I can get/fetch customer list", async ({request}) => {
        const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/list`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, params: {
                "dateStart": "2024-10-01",
                "dateEnd": "2024-10-30",
                "offset": "0",
            },
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.meta.offset).toBe(0);
        expect(responseBody.data.length).toBeTruthy();
    });
});