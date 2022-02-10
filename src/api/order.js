import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

class OrderApi {
    async getOrders(options) {
        let orders = [];
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.ordersUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
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
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const url = `${coreApi.ordersUrl}/${orderId}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(payload) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.ordersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
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
            const accessToken = window.localStorage.getItem('accessToken');
            await fetch(`${coreApi.ordersUrl}/${orderId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async partialUpdateOrder(orderId, payload) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const requestBody = JSON.stringify(payload);
            const response = await fetch(`${coreApi.ordersUrl}/${orderId}`, {
                method: "PATCH",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
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
