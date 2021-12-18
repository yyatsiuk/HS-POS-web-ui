import {subDays, subHours, subMinutes} from 'date-fns';
import {throttle} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';
import {wait} from '../utils/wait';

const now = new Date();

const customers = [
    {
        id: 'hhFMa50nwJj69u8zuxhU4rB0',
        address: 'м. Київ',
        createdAt: subDays(subHours(subMinutes(now, 25), 9), 234),
        instagram: "https://instagram.com/username2?utm_medium=copy_link",
        fullName: 'Rustin Rathe',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 32), 9), 166),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'PKO733MDY71CNAfP28zNIXxm',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 18), 9), 299),
        instagram: "https://instagram.com/username3?utm_medium=copy_link",
        fullName: 'Bell Covely',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 41), 16), 30),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'nbaFORHcVIO9WZhB87bPA7UP',
        address: 'м. Львів',
        createdAt: subDays(subHours(subMinutes(now, 7), 3), 125),
        instagram: "https://instagram.com/username4?utm_medium=copy_link",
        fullName: 'Meggie Heinonen',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 5), 8), 36),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'SVITwZUMQfKcYPcwnzhAUMxh',
        address: 'м. Львів',
        createdAt: subDays(subHours(subMinutes(now, 19), 18), 175),
        instagram: "https://instagram.com/username5?utm_medium=copy_link",
        fullName: 'Giraud Lamlin',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 1), 3), 262),
        orderedRecently: true,
        phone: '+380681111111',
    },
    {
        id: 'sLiBdwuZW16zStTOwl6VOXcT',
        address: 'м. Львів',
        createdAt: subDays(subHours(subMinutes(now, 20), 7), 53),
        fullName: 'Shelby O\'Docherty',
        instagram: "https://instagram.com/username6?utm_medium=copy_link",
        isReturning: true,
        lastOrderDate: subDays(subHours(subMinutes(now, 27), 15), 232),
        orderedRecently: true,
        phone: '+380681111111',
    },
    {
        id: 'WiXebuVqltcV0kH1nNtNkbM7',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 39), 19), 132),
        instagram: "https://instagram.com/username7?utm_medium=copy_link",
        fullName: 'Jenilee Felderer',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 44), 23), 9),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'DMrSJL0MQamehXAjOcDRcRtn',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 19), 21), 251),
        instagram: "https://instagram.com/username8?utm_medium=copy_link",
        fullName: 'Adler Atthowe',
        isReturning: false,
        orderedRecently: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 30), 16), 102),
        phone: '+380681111111',
    },
    {
        id: 'pxCg3anFlzlhNo1OckCJxLWt',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 45), 10), 40),
        instagram: "https://instagram.com/username9?utm_medium=copy_link",
        fullName: 'Candace Royden',
        isReturning: true,
        lastOrderDate: subDays(subHours(subMinutes(now, 40), 13), 35),
        orderedRecently: true,
        phone: '+380681111111',
    },
    {
        id: 'rXGJEOCkmZsK3YQcJUOtNc0m',
        address: 'м. Львів',
        createdAt: subDays(subHours(subMinutes(now, 11), 2), 30),
        instagram: "https://instagram.com/username10?utm_medium=copy_link",
        fullName: 'Sean Picott',
        isReturning: true,
        lastOrderDate: subDays(subHours(subMinutes(now, 52), 6), 323),
        orderedRecently: true,
        phone: '+380681111111',
    },
    {
        id: 'oYCVkxmJs2f0WwFvPAM8c2oP',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 19), 14), 299),
        instagram: "https://instagram.com/username11?utm_medium=copy_link",
        fullName: 'Emelia Brizland',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 14), 20), 204),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'oId02O8Gh1D98aoOWCcGEp8T',
        address: 'м. Київ',
        createdAt: subDays(subHours(subMinutes(now, 27), 17), 23),
        instagram: "https://instagram.com/username12?utm_medium=copy_link",
        fullName: 'Priscilla Parades',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 52), 18), 315),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'Lz1J3xnrBiTDJLrvqJ7miYbU',
        address: 'м. Київ',
        createdAt: subDays(subHours(subMinutes(now, 33), 5), 144),
        instagram: "https://instagram.com/username13?utm_medium=copy_link",
        fullName: 'Stefa Cattow',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 9), 12), 197),
        orderedRecently: true,
        phone: '+380681111111',
    },
    {
        id: 'rmEI7FaOOtRdix9haLcHbJMY',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 54), 3), 188),
        instagram: "https://instagram.com/username14?utm_medium=copy_link",
        fullName: 'Andi Jevons',
        isReturning: true,
        lastOrderDate: subDays(subHours(subMinutes(now, 48), 4), 235),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'UlpXn34FzzQPCLP3eIfTGy6A',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 6), 23), 114),
        instagram: "https://instagram.com/username15?utm_medium=copy_link",
        fullName: 'Wilhelm Engall',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 9), 20), 150),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: '0vKlpT7YwYguM25KVzgsSDVF',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 24), 11), 213),
        instagram: "https://instagram.com/username16?utm_medium=copy_link",
        fullName: 'Elbertine Broadhurst',
        isReturning: true,
        lastOrderDate: subDays(subHours(subMinutes(now, 21), 22), 16),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: 'REK1G9S8XLJQnOyk2kvd2Gnv',
        address: 'м. Львів',
        createdAt: subDays(subHours(subMinutes(now, 41), 11), 149),
        instagram: "https://instagram.com/username17?utm_medium=copy_link",
        fullName: 'Fabiano Jorioz',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 54), 22), 124),
        orderedRecently: false,
        phone: '+380681111111',
    },
    {
        id: '3TE1ntSP1EO4VdsBJTBOmmW3',
        address: 'м. Тернопіль',
        createdAt: subDays(subHours(subMinutes(now, 29), 16), 69),
        instagram: "https://instagram.com/username18?utm_medium=copy_link",
        fullName: 'Eda Annies',
        isReturning: false,
        lastOrderDate: subDays(subHours(subMinutes(now, 11), 22), 226),
        orderedRecently: true,
        phone: '+380681111111',
    }
];

const customer = {
    id: '6541237',
    address: 'м.Тернопіль',
    createdAt: subDays(subHours(subMinutes(now, 19), 10), 50),
    instagram: "https://instagram.com/username20?utm_medium=copy_link",
    fullName: 'John Doe J',
    lastContactDate: subDays(subHours(subMinutes(now, 32), 5), 123),
    lastOrderDate: subDays(subHours(subMinutes(now, 2), 1), 20),
    orderValue: 12200,
    ordersPlaced: 17,
    phone: '+380681111111'
};

const customerOrders = [
    {
        id: '5273',
        createdAt: new Date(),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м.Тернопіль',
        customer: {
            firstName: 'Іван',
            lastName: 'Іванов',
            middleName: 'Іванович',
            phone: '+380681111111',
            instagram: "https://instagram.com/username1?utm_medium=copy_link"
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
        content: 'Проблемний клієнт',
        createdAt: subMinutes(now, 78),
        senderAvatar: '/static/user-yaroslav-yatsiuk.png',
        senderId: '1',
        senderName: 'Ярослав Яцюк'
    }
];

class CustomerApi {
    async getCustomers(options) {
        if (throttle) {
            await wait(throttle);
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

    async getCustomer() {
        if (throttle) {
            await wait(throttle);
        }

        return Promise.resolve(customer);
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

    async getCustomerActivities() {
        if (throttle) {
            await wait(throttle);
        }

        return Promise.resolve(customerActivities);
    }

    async getCustomerNotes() {
        if (throttle) {
            await wait(throttle);
        }

        return Promise.resolve(customerNotes);
    }
}

export const customerApi = new CustomerApi();
