import {BASE_URL, CUSTOMER_ID, STORE_REFERENCE_1A, VALID_VEHICLE} from "../data/constants";

export class CustomerGarage {
    async createCustomerGarageVehicle ({request}, authToken) {
        const response = await request.post(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }, data: VALID_VEHICLE,
        });
        return response;
    }

    async getCustomerGarageVehicles ({request}, authToken) {
        const response = await request.get(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        return response;
    }

    async  deleteCustomerGarageVehicleByVin ({request}, authToken, Vin) {
        const response = await request.delete(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/${Vin}/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        return response;
    }

    async updateCustomerGarageVehicleByVin ({request}, authToken, vin, vehicle) {
        const response = await request.put(`${BASE_URL}/stores/${STORE_REFERENCE_1A}/customers/${CUSTOMER_ID}/vehicles/${vin}/garage`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            data: vehicle
        });
        return response;
    }
}