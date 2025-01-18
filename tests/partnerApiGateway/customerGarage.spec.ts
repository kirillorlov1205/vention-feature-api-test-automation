import {expect, test} from "@playwright/test";
import {
    BASE_URL,
    CUSTOMER_ID,
    EMPTY_VIN_VALIDATION_MESSAGE,
    INVALID_VEHICLE_VIN_LIST,
    LESS_THAN_LIMIT_VIN_VALIDATION_MESSAGE,
    MORE_THAN_LIMIT_VIN_VALIDATION_MESSAGE,
    STORE_REFERENCE_1A,
    VALID_VEHICLE,
    VEHICLES_LIST
} from "../../src/support/constants";
import {Helpers} from "../../src/support/helpers";

let authToken;

test.beforeAll(async ({request}) => {
    authToken = await Helpers.auth({request});
});

test.describe("Create customer garage vehicle", () => {

    test("I can create a new vehicle in customer garage", async ({request}) => {
        const response = await Helpers.createCustomerGarageVehicle({request}, authToken);
        const responseBody = JSON.parse(await response.text());
        await Helpers.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        expect(responseBody.vin).toBe(VALID_VEHICLE.vin);
        expect(response.status()).toBe(200);
    });

    test("I cannot create a new vehicle in customer garage, with vin contains more than limit characters", async ({request}) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: {
                "vin": INVALID_VEHICLE_VIN_LIST["More than limit characters"],
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

test.describe("Get customer garage vehicles", () => {
    test.describe.configure({retries: 5});
    test("I can get customer garage vehicles", async ({request}) => {
        await Helpers.createCustomerGarageVehicle({request}, authToken);
        const response = await Helpers.getCustomerGarageVehicles({request}, authToken);
        const responseBody = JSON.parse(await response.text());
        await Helpers.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        expect(responseBody.garageVehicles[0].vin).toEqual(VALID_VEHICLE.vin);
        expect(response.status()).toBe(200);
    });
});

test.describe("Update customer garage vehicle", () => {

    test("I can update customer garage vehicle", async ({request}) => {
        await Helpers.createCustomerGarageVehicle({request}, authToken);
        const response = await Helpers.updateCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin, VEHICLES_LIST.fordFusion)
        const responseBody = JSON.parse(await response.text());
        await Helpers.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        expect(responseBody).toEqual(VEHICLES_LIST.fordFusion);
        expect(response.status()).toBe(200);
    });
});

test.describe("Remove customer garage vehicle", () => {

    test("I can remove customer garage vehicle", async ({request}) => {
        await Helpers.createCustomerGarageVehicle({request}, authToken);
        const response = await Helpers.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.deletedCount).toBeTruthy();
    });
});
