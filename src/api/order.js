import {throttle} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';
import {wait} from '../utils/wait';

const orders = [
    {
        id: '5273',
        createdAt: new Date('2021-06-02T14:32:45.475Z'),
        address: 'м.Тернопіль',
        customer: {
            instagram: "https://instagram.com/username3?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Sean',
            lastName: 'Picott',
            middleName: 'J'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '4',
        },
        discountAmount: 0,
        paymentStatus: 'paid',
        status: 'delivered',
        trackingCode: 'KDO020021',
        totalAmount: 192.5,
        updatedAt: new Date('2021-06-02T14:32:45.475Z')
    },
    {
        id: '9265',
        createdAt: new Date('2021-05-12T20:10:45.475Z'),
        address: 'м. Збараж, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/username2?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Eda',
            lastName: 'Annies',
            middleName: 'E'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '3',
        },
        discountAmount: 0,
        lineItems: [
        ],
        paymentStatus: 'paid',
        status: 'complete',
        trackingCode: null,
        totalAmount: 631,
        updatedAt: new Date('2021-05-12T20:10:45.475Z')
    },
    {
        id: '9266',
        createdAt: new Date('2021-02-21T12:12:45.475Z'),
        address: 'м. Львів',
        customer: {
            instagram: "https://instagram.com/username1?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Fabiano',
            lastName: 'Jorioz',
            middleName: 'K'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '2',
        },
        discountAmount: 0,
        paymentStatus: 'paid',
        status: 'inProgress',
        totalAmount: 631,
        updatedAt: new Date('2021-02-21T12:12:45.475Z')
    }
];

const order = {
    id: '5273',
    createdAt: new Date('2021-12-11T14:32:45.475Z'),
    address: 'м. Тернопіль',
    customer: {
        instagram: "https://instagram.com/username3?utm_medium=copy_link",
        phone: '6035550123',
        firstName: 'Sean',
        lastName: 'Picott',
        middleName: 'Johnson'
    },
    courier: {
        name: 'Nova Poshta',
        branchNumber: '4',
    },
    discountAmount: 0,
    lineItems: [
        {
            discountAmount: 0,
            image: '/static/product-05.png',
            name: 'Кросівки Nike Red v1',
            quantity: 1,
            id: 'H000001',
            totalAmount: 1000,
            unitAmount: 1000
        },
        {
            discountAmount: 0,
            image: '/static/product-04.png',
            name: 'Кросівки Sneakers Red v1',
            quantity: 1,
            id: 'H000002',
            totalAmount: 800,
            unitAmount: 800
        }
    ],
    paymentStatus: 'paid',
    status: 'delivered',
    trackingCode: 'KDO020021',
    subtotalAmount: 1800,
    prepayment: 100,
    totalAmount: 1700,
    updatedAt: new Date('2021-12-11T14:32:45.475Z')
};

class OrderApi {
    async getOrders(options) {
        if (throttle) {
            await wait(throttle);
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

        return Promise.resolve({
            orders: paginatedOrders,
            ordersCount: filteredOrders.length
        });
    }

    async getOrder() {
        if (throttle) {
            await wait(throttle);
        }

        return Promise.resolve(order);
    }
}

export const orderApi = new OrderApi();
