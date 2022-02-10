import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

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

    async getCustomerNotes(customerId) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const url = `${coreApi.customersUrl}/${customerId}/notes`;
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

    async createNote(customerId, payload) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const url = `${coreApi.customersUrl}/${customerId}/notes`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async deleteNote(customerId, noteId) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const url = `${coreApi.customersUrl}/${customerId}/notes/${noteId}`;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
        } catch (error) {
            console.log(error);
            throw new Error("Unsuccessful response from the server")
        }
    }
}

export const customerApi = new CustomerApi();
