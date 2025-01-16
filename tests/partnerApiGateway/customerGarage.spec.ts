import {expect, test} from "@playwright/test";
import {
    BASE_URL,
    CUSTOMER_ID, EMPTY_VIN_VALIDATION_MESSAGE,
    INVALID_VEHICLE_VIN_LIST,
    LESS_THAN_LIMIT_VIN_VALIDATION_MESSAGE,
    MORE_THAN_LIMIT_VIN_VALIDATION_MESSAGE,
    STORE_REFERENCE_1A,
    VALID_VEHICLE
} from "../../src/support/constants";

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

test.describe("Create vehicle in customer garage", () => {

    test("I can create a new vehicle in customer garage", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: VALID_VEHICLE,
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.vin).toBe(VALID_VEHICLE.vin);
        expect(response.status()).toBe(200);
    });

    test("I cannot create a new vehicle in customer garage, with vin contains more than limit characters", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: {
                "vin": INVALID_VEHICLE_VIN_LIST["More than 17 characters"],
                "year": 2011,
                "make": "Honda",
                "model": "Accord",
                "stockNumber": "J8552A",
                "mileage": 2000
            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody).toEqual(MORE_THAN_LIMIT_VIN_VALIDATION_MESSAGE);
    });

    test("I cannot create a new vehicle in customer garage, with vin contains less than limit characters", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: {
                "vin": INVALID_VEHICLE_VIN_LIST["Less than limit characters"],
                "year": 2011,
                "make": "Honda",
                "model": "Accord",
                "stockNumber": "J8552A",
                "mileage": 2000
            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody).toEqual(LESS_THAN_LIMIT_VIN_VALIDATION_MESSAGE);
    });

    test("I cannot create a new vehicle in customer garage, with empty vin", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: {
                "vin": INVALID_VEHICLE_VIN_LIST["Empty VIN"],
                "year": 2011,
                "make": "Honda",
                "model": "Accord",
                "stockNumber": "J8552A",
                "mileage": 2000
            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody).toEqual(EMPTY_VIN_VALIDATION_MESSAGE);
    });
});

test.describe("Get vehicle from customer garage", () => {

    test("I can get vehicle from customer garage", async ({request}) => {
        const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody)
        // expect(responseBody.vin).toBe(VEHICLE.vin);
        expect(response.status()).toBe(200);
    });
});

test.describe("Remove vehicle from customer garage", () => {

    test("I can remove vehicle from customer garage", async ({request}) => {
        const response = await request.delete(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/${VALID_VEHICLE.vin}/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.deletedCount).toBeTruthy();
        expect(response.status()).toBe(200);
    });

});
