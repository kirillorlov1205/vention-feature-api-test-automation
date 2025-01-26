import {expect, test} from "@playwright/test";
import {auth, generateRandomDate} from "../../src/helpers/common";
import {createAppointment} from "../../src/methods/appointment";
import {APPOINTMENT_WITh_PAST_DATE, APPOINTMENT_WITh_WRONG_TYPE} from "../../src/data/constants";
import {APPOINTMENT_DATE_IN_PAST_VALIDATION_ERROR} from "../../src/data/validationMessages";

let authToken;

const APPOINTMENTS_WITH_DIFFERENT_TYPES = [

    {
        "name": "appointment with type 'Sales'",
        "data": {
            "Type": "Sales",
            "AppointmentDate": (generateRandomDate(new Date(2026, 1, 1), new Date(2090, 1, 1))),
            "CreatedBy": "AssociatedSalesperson",
            "ScheduledFor": "AssociatedSalesperson",
            "Notes": "Test note: 'Type' = 'Sales'"
        }
    },
    {
        "name": "appointment with type 'Delivery'",
        "data": {
            "Type": "Delivery",
            "AppointmentDate": (generateRandomDate(new Date(2026, 1, 1), new Date(2090, 1, 1))),
            "CreatedBy": "AssociatedSalesperson",
            "ScheduledFor": "AssociatedSalesperson",
            "Notes": "Test note: 'Type' = 'Delivery'"
        }
    },
    {
        "name": "appointment with type 'General'",
        "data": {
            "Type": "General",
            "AppointmentDate": (generateRandomDate(new Date(2026, 1, 1), new Date(2090, 1, 1))),
            "CreatedBy": "AssociatedSalesperson",
            "ScheduledFor": "AssociatedSalesperson",
            "Notes": "Test note: 'Type' = 'General'"
        }
    }
]

test.beforeAll(async ({request}) => {
    authToken = await auth({request});
});

test.describe("Appointment. Create appointment", () => {
    test.describe.configure({retries: 10});

    APPOINTMENTS_WITH_DIFFERENT_TYPES.forEach(async (item) => {
        test(`I can create ${item.name}`, async ({request}) => {
            const response = await createAppointment({request}, authToken, item.data);
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.id).toBeTruthy();
        });
    })

    test(`I cannot create appointment with 'Past date'`, async ({request}) => {
        const response = await createAppointment({request}, authToken, APPOINTMENT_WITh_PAST_DATE)
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody).toEqual(APPOINTMENT_DATE_IN_PAST_VALIDATION_ERROR);
    });

    test(`I cannot create appointment with wrong type`, async ({request}) => {
        const response = await createAppointment({request}, authToken, APPOINTMENT_WITh_WRONG_TYPE)
        expect(response.status()).toBe(400);
    });
});