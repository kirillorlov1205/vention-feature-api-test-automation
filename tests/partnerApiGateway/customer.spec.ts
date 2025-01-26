import {expect, test} from "@playwright/test";
import {
    BASE_URL,
    CONTACT_WITH_EMPTY_EMAILS_AND_PHONES,
    CUSTOMER_CONTACTS_LIST,
    CUSTOMER_ID, INVALID_EMAILS_LIST,
    INVALID_PHONES_LIST,
    OFFSET_LIST,
    STORE_REFERENCE_1A,
    VALID_CUSTOMER
} from "../../src/data/constants";
import {auth} from "../../src/helpers/common";
import {getCustomerById, getCustomerListByDate, updateCustomerContact} from "../../src/methods/customer";
import {INVALID_EMAIL_VALIDATION_ERROR, INVALID_PHONE_VALIDATION_ERROR} from "../../src/data/validationMessages";
import {inflate} from "node:zlib";

let authToken;

test.beforeAll(async ({request}) => {
    authToken = await auth({request});
});

test.describe("Customer. Update customer", () => {

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

test.describe("Customer. Get customer", () => {

    test("I can get customer by id", async ({request}) => {
        const response = await getCustomerById({request}, authToken, CUSTOMER_ID);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.customerInfo.firstName).toEqual(VALID_CUSTOMER.customer.firstName);
    });

    test("I cannot get customer by wrong id", async ({request}) => {
        const response = await getCustomerById({request}, authToken, "wrongId");
        expect(response.status()).toBe(400);
    });

    test("I can get customer list", async ({request}) => {
        const response = await getCustomerListByDate({request}, authToken, "2024-10-01", "2024-10-30", 0);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.meta.offset).toBe(0);
        expect(responseBody.data.length).toBeTruthy();
    });

    OFFSET_LIST.forEach((offset) => {
        test(`I can get customer list with offset ${offset}`, async ({request}) => {
            const response = await getCustomerListByDate({request}, authToken, "2024-10-01", "2025-10-01", offset);
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.meta.offset).toBe(offset);
            expect(responseBody.data.length).toBeTruthy();
        });
    })
});

test.describe("Customer. Update customer contact", () => {

    CUSTOMER_CONTACTS_LIST.forEach((customerContact) => {
        test(`I can update customer ${customerContact.name}`, async ({request}) => {
            const response = await updateCustomerContact({request}, authToken, CUSTOMER_ID, customerContact.data);
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.customer.phones).toEqual(customerContact.data.phones);
            expect(responseBody.customer.emails).toEqual(customerContact.data.emails);
        });
    })

    test("I can remove customer contacts", async ({request}) => {
        const response = await updateCustomerContact({request}, authToken, CUSTOMER_ID, CONTACT_WITH_EMPTY_EMAILS_AND_PHONES);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.customer.phones.length).not.toBeTruthy();
        expect(responseBody.customer.emails.length).not.toBeTruthy();
    })

    INVALID_PHONES_LIST.forEach((contact) => {
        test(`I cannot update customer contact by phone '${contact.name}'`, async ({request}) => {
            const response = await updateCustomerContact({request}, authToken, CUSTOMER_ID, contact.data);
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(400);
            expect(responseBody).toEqual(INVALID_PHONE_VALIDATION_ERROR);
        })
    })

    INVALID_EMAILS_LIST.forEach((contact) => {
        test(`I cannot update customer contact by email '${contact.name}'`, async ({request}) => {
            const response = await updateCustomerContact({request}, authToken, CUSTOMER_ID, contact.data);
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(400);
            expect(responseBody).toEqual(INVALID_EMAIL_VALIDATION_ERROR);
        })
    })
});