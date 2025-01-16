import {expect, test} from "@playwright/test";
import {BASE_URL, CUSTOMER, CUSTOMER_ID, STORE_REFERENCE_1A} from "../../src/support/constants";


let authToken = "";

test.beforeAll(async ({request}) => {
    const response = await request.post(`${BASE_URL}/authentication/token`, {
        data: {
            "clientId": "botdoc@test.com",
            "clientSecret": "Botdoc123!@#",
        },
    });
    authToken = JSON.parse(await response.text()).idToken;
});

test.describe("Customer endpoints", () => {

    test.describe("Update customer", () => {

        test("I can update customer by id", async ({request}) => {
            const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                }, data: CUSTOMER,
            });
            expect(response.status()).toBe(200);
        });

        test("I can update customer contact", async ({request}) => {
            const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/contact`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                }, data: {
                    "emails": CUSTOMER.customer.emails,
                    "phones": CUSTOMER.customer.phones,
                },
            });
            const responseBody = JSON.parse(await response.text());
            expect(responseBody.customer.emails.length).toBe(CUSTOMER.customer.emails.length);
            expect(responseBody.customer.phones.length).toBe(CUSTOMER.customer.phones.length);
            expect(response.status()).toBe(200);
        });
    });

    test.describe("Get customer", () => {

        test("I can get customer by id", async ({request}) => {
            const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.customerInfo.firstName).toBe("Clark");
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
            console.log(responseBody);
            expect(response.status()).toBe(200);
            expect(responseBody.meta.offset).toBe(0);
            expect(responseBody.data.length).toBeTruthy();
        });
    });
});

