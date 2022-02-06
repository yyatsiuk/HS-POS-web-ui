import {subMinutes} from 'date-fns';
import {coreApi, throttle} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';
import {wait} from '../utils/wait';

const now = new Date();

const emptyCustomer = {
    id: null,
    address: "Україна, Тернопіль",
    instagram: "https://instagram.com/instagram?utm_medium=copy_link",
    fullName: "Ім'я Прізвище",
    phone: "0980000000",
}

const defaultCusomterOrders = [
    {
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
    }
];

const customerNotes = [
    {
        id: '2',
        content: 'Дуже вредна чайка!',
        createdAt: subMinutes(now, 78),
        senderAvatar: '/static/user-chen_simmons.png',
        senderId: '1',
        senderName: 'Kate Heida'
    }
];

class CustomerApi {
    async getCustomers(options) {
        let customers = [];
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.customersUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            customers = await response.json()
        } catch (error) {
            console.log(error);
            return customers;
        }

        const {filters, sort, sortBy, page, query, view} = options;

        /*
         NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
         Since this does not connect to a real backend, we simulate these operations.
         */
        const queriedCustomers = customers.filter((_customer) => {
            // If query exists, it looks only in customer full name field
            if (!!query && !_customer.fullName?.toLowerCase().includes(query.toLowerCase())) {
                return false;
            }

            // No need to look for any resource fields
            if (typeof view === 'undefined' || view === 'all') {
                return true;
            }

            if (view === 'isReturning' && !_customer.isReturning) {
                return false;
            }

            if (view === 'orderedRecently' && !_customer.orderedRecently) {
                return false;
            }

            return true;
        });
        const filteredCustomers = applyFilters(queriedCustomers, filters);
        const sortedCustomers = applySort(filteredCustomers, sort, sortBy);
        const paginatedCustomers = applyPagination(sortedCustomers, page);

        return Promise.resolve({
            customers: paginatedCustomers,
            customersCount: filteredCustomers.length
        });
    }

    async getCustomer(customerId) {
        if (customerId === null) {
            return emptyCustomer;
        }
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const url = `${coreApi.customersUrl}/${customerId}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async crateCustomer(payload) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.customersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload)
            });
            console.log(response.headers.location);
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async updateCustomer(payload, id) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(`${coreApi.customersUrl}/${id}`, {
                method: "PUT",
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

    async deleteCustomer(id) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            await fetch(`${coreApi.customersUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async getCustomerOrders(customerId, options = {}) {
        if (!customerId) {
            return defaultCusomterOrders;
        }

        let customerOrders = [];
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(`${coreApi.customersUrl}/${customerId}/orders`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            customerOrders = await response.json()
        } catch (error) {
            console.log(error);
            throw new Error("Unsuccessful response from the server")
        }

        const {sort, sortBy} = options;

        /*
         NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
         Since this does not connect to a real backend, we simulate these operations.
         */

        const sortedOrders = applySort(customerOrders, sort, sortBy);

        return Promise.resolve(sortedOrders);
    }

    async getCustomerNotes() {
        if (throttle) {
            await wait(throttle);
        }

        return Promise.resolve(customerNotes);
    }
}

export const customerApi = new CustomerApi();
