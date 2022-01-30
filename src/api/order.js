import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

const order = {
    "id": "0",
    "lineItems": [],
    "prepaymentAmount": 0,
    "subtotalAmount": 0,
    "totalAmount": 0,
    "customer": {
        "id": 7,
        "fullName": "Ім'я Прізвище",
        "instagram": "https://instagram.com/test?utm_medium=copy_link",
        "address": "Ternopil",
        "phone": "0680000000",
        "createdAt": "2022-01-17T15:42:18.497451",
        "updatedAt": "2022-01-21T22:08:43.055751"
    },
    "status": "PLACED",
    "paymentStatus": "UNPAID",
    "address": "м. Тернопіль",
    "courier": "Nova Poshta",
    "branchNumber": "12",
    "trackingCode": null,
    "createdAt": "2022-01-27T22:21:59.525072",
    "updatedAt": "2022-01-27T22:21:59.526215"
};

class OrderApi {
    async getOrders(options) {
        let orders = [];
        try {
            const response = await fetch(coreApi.ordersUrl);
            orders = await response.json()
        } catch (error) {
            console.log(error);
            return orders;
        }

        const {filters, sort, sortBy, page, query, view} = options;

        /*
         NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
         Since this does not connect to a real backend, we simulate these operations.
         */

        const queriedOrders = orders.filter((_order) => {
            if (!!query && !_order.id.toLowerCase().includes(query.toLowerCase())) {
                return false;
            }

            // No need to look for any resource fields
            if (typeof view === 'undefined' || view === 'all') {
                return true;
            }

            // In this case, the view represents the resource status
            return _order.status === view;
        });
        const filteredOrders = applyFilters(queriedOrders, filters);
        const sortedOrders = applySort(filteredOrders, sort, sortBy);
        const paginatedOrders = applyPagination(sortedOrders, page);

        return {
            orders: paginatedOrders,
            ordersCount: filteredOrders.length
        };
    }

    async getOrderById(orderId) {
        if (orderId === null) {
            return order;
        }
        try {
            const url = `${coreApi.ordersUrl}/${orderId}`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(payload) {
        try {
            const response = await fetch(coreApi.ordersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async deleteOrder(orderId) {
        try {
            await fetch(`${coreApi.ordersUrl}/${orderId}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async partialUpdateOrder(orderId, payload) {
        try {
            const requestBody = JSON.stringify(payload);
            const response = await fetch(`${coreApi.ordersUrl}/${orderId}`, {
                method: "PATCH",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: requestBody
            });

            return await response.json();
        } catch (error) {
            console.log("Inside catch block");
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

}

export const orderApi = new OrderApi();
