import {expect} from "@playwright/test";

export const BASE_URL = "https://qa-partnerapigateway.drivecentric-sdlc.com/api";
export const STORE_REFERENCE_1A = "120bb4ae-25ea-5de8-8e22-3c106501b21b";
export const CUSTOMER_ID = "cd5ee319-4635-42ca-a236-94342ef873bd";
export const CUSTOMER = {
    "customer": {
        "customerType": "Individual",
        "firstName": "Clark",
        "middleName": "automation_test",
        "lastName": "Nolan",
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
        "vin": "1HGCP3F89BA01898",
        "year": 2011,
        "make": "Honda",
        "model": "Accord",
        "stockNumber": "J8552A",
        "mileage": 2000
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