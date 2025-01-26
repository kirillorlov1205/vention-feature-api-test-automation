import {generateRandomDate} from "../helpers/common";

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

export const INVALID_EMAILS_LIST = [
    {
        "name": "email with two '@' symbols",
        "data": {
            "phones": [],
            "emails": [
                {
                    "type": "Work",
                    "value": "automationTest@@test.com"
                }
            ],
        },
    }
]

export const INVALID_PHONES_LIST = [
    {
        "name": "more than 10 symbols",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "11111111121"
                }
            ],
            "emails": []
        },
    },
    {
        "name": "less than 10 symbols",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "111111111"
                }
            ],
            "emails": []
        },
    },
    {
        "name": "with alphabetic symbols",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "11111s111"
                }
            ],
            "emails": []
        },
    }
]

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

export const APPOINTMENT_WITh_PAST_DATE =
    {
        "Type": "General",
        "AppointmentDate": "2023-10-05T13:45:00",
        "CreatedBy": "AssociatedSalesperson",
        "ScheduledFor": "AssociatedSalesperson",
        "Notes": "Test note: 'Type' = 'General'"
    }

export const APPOINTMENT_WITh_WRONG_TYPE =
    {
        "Type": "wrongType",
        "AppointmentDate": (generateRandomDate(new Date(2026, 1, 1), new Date(2027, 1, 1))),
        "CreatedBy": "AssociatedSalesperson",
        "ScheduledFor": "AssociatedSalesperson",
        "Notes": "Test note: 'Type' = 'General'"
    }

export const OFFSET_LIST = [50, 100, 150, 200];

export const CUSTOMER_CONTACTS_LIST = [
    {
        "name": "contact with email",
        "data": {
            "phones": [],
            "emails": [
                {
                    "type": "Work",
                    "value": "automationTest@test.com"
                }
            ],
        },
    },
    {
        "name": "contact with two emails",
        "data": {
            "phones": [],
            "emails": [
                {
                    "type": "Work",
                    "value": "automationTest@test.com"
                },
                {
                    "type": "Work",
                    "value": "kirillAutomation@test.com"
                }
            ],
        },
    },
    {
        "name": "contact with phone",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "8562882844"
                }
            ],
            "emails": []
        },
    },
    {
        "name": "contact with two phones",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "8562882844"
                },
                {
                    "type": "Work",
                    "value": "2034086944"
                }
            ],
            "emails": []
        },
    },
    {
        "name": "contact with phone and email",
        "data": {
            "phones": [
                {
                    "type": "Home",
                    "value": "8562882844"
                },
            ],
            "emails": [
                {
                    "type": "Work",
                    "value": "kirillAutomation@test.com"
                }
            ],
        },
    },
]

export const CONTACT_WITH_EMPTY_EMAILS_AND_PHONES = {
    "phones": [],
    "emails": [],
}