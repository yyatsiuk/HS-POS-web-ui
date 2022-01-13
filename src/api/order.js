import {throttle} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';
import {wait} from '../utils/wait';

const orders = [
    {
        id: '5273',
        createdAt: new Date('2021-06-02T14:32:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м.Тернопіль',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '4',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                currencySymbol: '$',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentMethod: 'debit',
        paymentStatus: 'paid',
        status: 'delivered',
        trackingCode: 'KDO020021',
        totalAmount: 192.5,
        updatedAt: new Date('2021-06-02T14:32:45.475Z')
    },
    {
        id: '9265',
        createdAt: new Date('2021-05-12T20:10:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'с. Гусятин, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '3',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                currencySymbol: '$',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentMethod: 'paypal',
        paymentStatus: 'paid',
        status: 'complete',
        trackingCode: null,
        totalAmount: 631,
        updatedAt: new Date('2021-05-12T20:10:45.475Z')
    },
    {
        id: '9266',
        createdAt: new Date('2021-02-21T12:12:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'с. Гадинківці, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '2',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentMethod: 'creditCard',
        paymentStatus: 'paid',
        status: 'inProgress',
        totalAmount: 631,
        updatedAt: new Date('2021-02-21T12:12:45.475Z')
    },
    {
        id: '1090',
        createdAt: new Date('2021-09-09T10:10:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м. Збараж, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '1',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentMethod: 'stripe',
        paymentStatus: 'paid',
        status: 'shipped',
        trackingCode: null,
        totalAmount: 100,
        updatedAt: new Date('2021-09-09T10:10:45.475Z')
    },
    {
        id: '1111',
        createdAt: new Date('2021-05-21T02:02:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м. Збараж, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '7',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentId: 'OTIK283L',
        paymentMethod: 'debit',
        paymentStatus: 'paid',
        status: 'returned',
        trackingCode: null,
        totalAmount: 60,
        updatedAt: new Date('2021-05-21T02:02:45.475Z')
    },
    {
        id: '2475',
        createdAt: new Date('2021-05-11T02:02:45.475Z'),
        currency: 'UAH',
        currencySymbol: '\u20B4',
        address: 'м. Збараж, Тернопільська обл.',
        customer: {
            instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
            phone: '6035550123',
            firstName: 'Чайка',
            lastName: 'Чайківська',
            middleName: 'Іванівна'
        },
        courier: {
            name: 'Nova Poshta',
            branchNumber: '6',
        },
        discountAmount: 0,
        lineItems: [
            {
                currency: 'UAH',
                discountAmount: 0,
                image: '/static/product-01.png',
                name: 'Watch with Leather Strap',
                quantity: 1,
                sku: 'BBAK01-A',
                subtotalAmount: 160,
                taxAmount: 32.5,
                totalAmount: 192.5,
                unitAmount: 160
            }
        ],
        paymentMethod: 'paypal',
        paymentStatus: 'paid',
        status: 'placed',
        trackingCode: null,
        totalAmount: 1200,
        updatedAt: new Date('2021-05-11T02:02:45.475Z')
    }
];

const order = {
    id: '5273',
    createdAt: new Date('2021-06-02T14:32:45.475Z'),
    currency: 'UAH',
    currencySymbol: '\u20B4',
    address: 'м. Збараж, Тернопільська обл.',
    customer: {
        instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
        phone: '6035550123',
        firstName: 'Чайка',
        lastName: 'Чайківська',
        middleName: 'Іванівна'
    },
    courier: {
        name: 'Nova Poshta',
        branchNumber: '5',
    },
    discountAmount: 0,
    lineItems: [
        {
            currency: 'UAH',
            discountAmount: 0,
            image: '/static/product-05.png',
            name: 'Червоні Капці',
            quantity: 1,
            sku: 'BBAK01-A',
            totalAmount: 1000,
            unitAmount: 1000
        }
    ],
    paymentMethod: 'debit',
    paymentStatus: 'paid',
    status: 'delivered',
    trackingCode: 'KDO020021',
    subtotalAmount: 1000,
    prepayment: 100,
    totalAmount: 900,
    updatedAt: new Date('2021-06-02T14:32:45.475Z')
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
