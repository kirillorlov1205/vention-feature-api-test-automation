import {expect, test} from "@playwright/test";
import {auth} from "../../src/helpers/common";
import {subscribeToCommunication, unsubscribeToCommunication} from "../../src/methods/customerCommunication";

let authToken: string;

test.beforeAll(async ({request}) => {
    authToken = await auth({request});
});

const subscribeTestData = [
    {
        name: "all subscription settings true",
        communications: {
            "email": true,
            "marketing": true,
            "phone": true
        }
    },
    {
        name: "subscription setting email = false",
        communications: {
            "email": false,
            "marketing": true,
            "phone": true
        }
    },
    {
        name: "subscription setting marketing = false",
        communications: {
            "email": true,
            "marketing": false,
            "phone": true
        }
    },
    {
        name: "subscription setting phone = false",
        communications: {
            "email": true,
            "marketing": true,
            "phone": false
        }
    },
    {
        name: "all subscription settings false",
        communications: {
            "email": true,
            "marketing": true,
            "phone": true
        }
    }
];

const unsubscribeTestData = [
    {
        name: "all subscription settings true",
        communications: {
            "text": true,
            "email": true,
            "marketing": true,
            "phone": true
        }
    },
    {
        name: "subscription setting email = false",
        communications: {
            "text": true,
            "email": false,
            "marketing": true,
            "phone": true
        }
    },
    {
        name: "subscription setting marketing = false",
        communications: {
            "text": true,
            "email": true,
            "marketing": false,
            "phone": true
        }
    },
    {
        name: "subscription setting phone = false",
        communications: {
            "text": true,
            "email": true,
            "marketing": true,
            "phone": false
        }
    },
    {
        name: "subscription setting text = false",
        communications: {
            "text": false,
            "email": true,
            "marketing": true,
            "phone": true
        }
    },
    {
        name: "all subscription settings false",
        communications: {
            "text": false,
            "email": false,
            "marketing": false,
            "phone": false
        }
    }
];

test.describe("Customer communication subscription", () => {

    subscribeTestData.forEach((SubscriptionSettings) => {
        test(`I can subscribe to customer communication with '${SubscriptionSettings.name}'`, async ({request}) => {
            const response = await subscribeToCommunication({request}, authToken, SubscriptionSettings.communications)
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.communications).toEqual(SubscriptionSettings.communications);
        })
    })

    unsubscribeTestData.forEach((SubscriptionSettings) => {
        test(`I can unsubscribe from customer communication with '${SubscriptionSettings.name}'`, async ({request}) => {
            const response = await unsubscribeToCommunication({request}, authToken, SubscriptionSettings.communications)
            const responseBody = JSON.parse(await response.text());
            expect(response.status()).toBe(200);
            expect(responseBody.communications).toEqual(SubscriptionSettings.communications);
        })
    })
})

