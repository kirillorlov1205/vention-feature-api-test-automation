import ENV from "../utils/env";
import {BASE_URL, CUSTOMER_ID, STORE_REFERENCE_1A, VALID_VEHICLE} from "./constants";

export class Helpers {
    static auth = async ({request}) => {
        const response = await request.post(`${ENV.PARTNER_API_GATEWAY_URL}/authentication/token`, {
            data: {
                "clientId": ENV.CLIENT_ID,
                "clientSecret": ENV.CLIENT_SECRET,
            },
        });
        return JSON.parse(await response.text()).idToken;
    }

    static createCustomerGarageVehicle = async ({request}, authToken) => {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: VALID_VEHICLE,
        });
        return response;
    }

    static getCustomerGarageVehicles = async ({request}, authToken) => {
        const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        return response;
    }

    static deleteCustomerGarageVehicleByVin = async ({request}, authToken, Vin) => {
        const response = await request.delete(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/${Vin}/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        return response;
    }

    static updateCustomerGarageVehicleByVin = async ({request}, authToken, vin, vehicle) => {
        const response = await request.put(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/${vin}/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            data: vehicle
        });
        return response;
    }
}

