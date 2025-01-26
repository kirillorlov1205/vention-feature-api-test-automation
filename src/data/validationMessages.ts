import {expect} from "@playwright/test";


export const DELETE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST = {
    "VIN_LESS_THAN_LIMIT": {
        code: 400,
        message: "Validation failed for these properties: 'Vin'",
        details: "The length of 'Vin' must be at least 3 characters. You entered 2 characters.",
        hint: 'Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.',
        correlationId: expect.any(String),
        traceId: null
    },
    "VIN_MORE_THAN_LIMIT": {
        "code": 400,
        "message": "Validation failed for these properties: 'Vin'",
        "details": "The length of 'Vin' must be 17 characters or fewer. You entered 18 characters.",
        "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
        "correlationId": expect.any(String),
        "traceId": null
    },
}

export const CREATE_GARAGE_VEHICLE_VALIDATION_MESSAGE_LIST = {
    "VIN_MORE_THAN_LIMIT": {
        "code": 400,
        "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
        "details": "The length of 'Vin' must be 17 characters or fewer. You entered 18 characters.",
        "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
        "correlationId": expect.any(String),
        "traceId": null
    },

    "VIN_LESS_THAN_LIMIT": {
        "code": 400,
        "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
        "details": "The length of 'Vin' must be at least 3 characters. You entered 2 characters.",
        "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
        "correlationId": expect.any(String),
        "traceId": null
    },

    "EMPTY_VIN": {
        "code": 400,
        "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
        "details": "'Vin' must not be empty. The length of 'Vin' must be at least 3 characters. You entered 0 characters.",
        "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
        "correlationId": expect.any(String),
        "traceId": null
    }
}

export const APPOINTMENT_DATE_IN_PAST_VALIDATION_ERROR = {
    "code": 400,
    "message": "Validation failed for these properties: 'AppointmentDate'",
    "details": expect.any(String),
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}

export const INVALID_PHONE_VALIDATION_ERROR = {
    "code": 400,
    "message": "Validation failed for these properties: 'Phones[0].Value'",
    "details": "Phone provided is not a valid phone number.",
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}

export const INVALID_EMAIL_VALIDATION_ERROR = {
    "code": 400,
    "message": "Validation failed for these properties: 'Emails[0].Value'",
    "details": "Email provided is not a valid email address",
    "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
    "correlationId": expect.any(String),
    "traceId": null
}

// export const LESS_THAN_LIMIT_VIN_VALIDATION_MESSAGE = {
//     "code": 400,
//     "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
//     "details": "The length of 'Vin' must be at least 3 characters. You entered 2 characters.",
//     "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
//     "correlationId": expect.any(String),
//     "traceId": null
// }

// export const EMPTY_VIN_VALIDATION_MESSAGE = {
//     "code": 400,
//     "message": "Validation failed for these properties: 'GarageVehicleModel.Vin'",
//     "details": "'Vin' must not be empty. The length of 'Vin' must be at least 3 characters. You entered 0 characters.",
//     "hint": "Check the API documentation at https://partners.drivecentric.io/reference to ensure your request structure adheres to the required format.",
//     "correlationId": expect.any(String),
//     "traceId": null
// }