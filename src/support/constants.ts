import {expect} from "@playwright/test";

export const BASE_URL = "https://qa-partnerapigateway.drivecentric-sdlc.com/api";
export const STORE_REFERENCE_1A = "2df7d8fb-8c92-4eef-aa80-3bd904c1dd97";
export const CUSTOMER_ID = "bf6cadab-8180-4000-a0dc-dd9f0de99209";
export const VALID_CUSTOMER = {
    "customer": {
        "customerType": "Individual",
        "firstName": "Kirill",
        "middleName": "test",
        "lastName": "Automation",
        "companyName": "Company automation",
        "currentAddress": {
            "line1": "line 1 automation",
            "line2": "line 2 automation",
            "city": "New York",
            "StateOrProvince": "ON",
            "ZipOrPostalCode": "G6B 7J3",
            "CountryCode": "CA",
            "country": "Canada"
        },
        "phones": [
            {
                "value": "8562881232",
                "type": "Home"
            },
            {
                "value": "8562882844",
                "type": "work"
            }
        ],
        "emails": [
            {
                "value": "automationTest@test.com",
                "type": "work"
            },
            {
                "value": "automationTest2@test.com",
                "type": "home"
            }
        ]
    }
}

export const VALID_VEHICLE =
    {
        "vin": "1HGCP3F89VA018912",
        "year": 2011,
        "make": "Honda",
        "model": "Accord",
        "stockNumber": "J8552A",
        "mileage": 2000
    }

export const VEHICLES_LIST = {
    "fordFusion": {
        "vin": "1HGCP3F89VA018912",
        "year": 2010,
        "make": "Ford",
        "model": "Fusion"
    },
    "hondaAccord": {
        "vin": "1HGCP3F89VA018912",
        "year": 2011,
        "make": "Honda",
        "model": "Accord",
        "stockNumber": "J8552A",
        "mileage": 2000
    }
}


export const INVALID_VEHICLE_VIN_LIST =
    {
        "More than limit characters": "12345ABCDE67890112",
        "Less than limit characters": "12",
        "Empty VIN": "",
    }

export const MORE_THAN_LIMIT_VIN_VALIDATION_MESSAGE = {
    "code": 400,
    "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
    "details": "The length of 'Vin' must be 17 characters or fewer. You entered 18 characters.",
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}

export const LESS_THAN_LIMIT_VIN_VALIDATION_MESSAGE = {
    "code": 400,
    "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
    "details": "The length of 'Vin' must be at least 3 characters. You entered 2 characters.",
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}

export const EMPTY_VIN_VALIDATION_MESSAGE = {
    "code": 400,
    "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
    "details": "'Vin' must not be empty. The length of 'Vin' must be at least 3 characters. You entered 0 characters.",
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}