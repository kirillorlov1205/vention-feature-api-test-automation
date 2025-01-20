import {expect, test} from "@playwright/test";
import {
    BASE_URL,
    CUSTOMER_ID,
    INVALID_VEHICLE_VIN_LIST,
    STORE_REFERENCE_1A,
    VALID_VEHICLE,
    VEHICLES_LIST
} from "../../src/data/constants";
import {CustomerGarage} from "../../src/methods/customerGarage";
import {
    CREATE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST,
    DELETE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST,
} from "../../src/data/validationMessages";
import {auth} from "../../src/helpers/common";

const CUSTOMER_GARAGE: CustomerGarage = new CustomerGarage();
let authToken: string;

test.beforeAll(async ({request}) => {
    authToken = await auth({request});
});

test.describe("Customer garage. Create customer garage vehicle", () => {
    test.describe.configure({retries: 10});

    test("I can create a new vehicle in customer garage", async ({request}) => {
        const response = await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const responseBody = JSON.parse(await response.text());
        await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
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
        expect(responseBody).toEqual(CREATE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST.VIN_MORE_THAN_LIMIT);
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
        expect(responseBody).toEqual(CREATE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST.VIN_LESS_THAN_LIMIT);
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
        expect(responseBody).toEqual(CREATE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST.EMPTY_VIN);
    });
});

test.describe("Customer garage. Get customer garage vehicles", () => {
    test.describe.configure({retries: 10});
    test("I can get customer garage vehicles", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.getCustomerGarageVehicles({request}, authToken);
        const responseBody = JSON.parse(await response.text());
        await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        expect(responseBody.garageVehicles[0].vin).toEqual(VALID_VEHICLE.vin);
        expect(response.status()).toBe(200);
    });
});

test.describe("Customer garage. Update customer garage vehicle", () => {

    test("I can update customer garage vehicle", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.updateCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin, VEHICLES_LIST.fordFusion)
        const responseBody = JSON.parse(await response.text());
        await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        expect(responseBody).toEqual(VEHICLES_LIST.fordFusion);
        expect(response.status()).toBe(200);
    });
});

test.describe("Customer garage. Delete customer garage vehicle", () => {
    test.describe.configure({retries: 10});

    test("I can delete customer garage vehicle", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, VALID_VEHICLE.vin);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.deletedCount).toBeTruthy();
    });

    test("I cannot delete customer garage vehicle by not existing vin", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, "notExistingVin");
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.deletedCount).not.toBeTruthy();
    });

    test("I cannot delete customer garage vehicle by vin less than limit characters", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, INVALID_VEHICLE_VIN_LIST["Less than limit characters"]);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody).toEqual(DELETE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST.VIN_LESS_THAN_LIMIT);
    });

    test("I cannot delete customer garage vehicle by vin more than limit characters", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, INVALID_VEHICLE_VIN_LIST["More than limit characters"]);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody).toEqual(DELETE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST.VIN_MORE_THAN_LIMIT);
    });

    test("I cannot delete customer garage vehicle by emty vin", async ({request}) => {
        await CUSTOMER_GARAGE.createCustomerGarageVehicle({request}, authToken);
        const response = await CUSTOMER_GARAGE.deleteCustomerGarageVehicleByVin({request}, authToken, "");
        expect(response.status()).toBe(404);
    });
});