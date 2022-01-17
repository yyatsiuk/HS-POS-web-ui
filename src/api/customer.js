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

const customerOrders = [
    {
        id: '5273',
        createdAt: new Date(),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м.Тернопіль',
        customer: {
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна',
            phone: '6035550123',
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link"
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '4',
        },
        status: 'delivered',
        totalAmount: 192.5,
        updatedAt: new Date()
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
            const response = await fetch(coreApi.customersUrl);
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
            const url = `${coreApi.customersUrl}/${customerId}`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async crateCustomer(payload) {
        try {
            const response = await fetch(coreApi.customersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            console.log(response.headers.location);
        } catch (error) {
            console.log(error);
        }
    }

    async getCustomerOrders(options = {}) {
        if (throttle) {
            await wait(throttle);
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
