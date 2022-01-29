import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

// const orders = [
//     {
//         id: '5273',
//         createdAt: new Date('2021-06-02T14:32:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'м.Тернопіль',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '4',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 currencySymbol: '$',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentMethod: 'debit',
//         paymentStatus: 'paid',
//         status: 'delivered',
//         trackingCode: 'KDO020021',
//         totalAmount: 192.5,
//         updatedAt: new Date('2021-06-02T14:32:45.475Z')
//     },
//     {
//         id: '9265',
//         createdAt: new Date('2021-05-12T20:10:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'с. Гусятин, Тернопільська обл.',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '3',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 currencySymbol: '$',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 sku: 'BBAK01-A',
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentMethod: 'paypal',
//         paymentStatus: 'paid',
//         status: 'complete',
//         trackingCode: null,
//         totalAmount: 631,
//         updatedAt: new Date('2021-05-12T20:10:45.475Z')
//     },
//     {
//         id: '9266',
//         createdAt: new Date('2021-02-21T12:12:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'с. Гадинківці, Тернопільська обл.',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '2',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 sku: 'BBAK01-A',
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentMethod: 'creditCard',
//         paymentStatus: 'paid',
//         status: 'inProgress',
//         totalAmount: 631,
//         updatedAt: new Date('2021-02-21T12:12:45.475Z')
//     },
//     {
//         id: '1090',
//         createdAt: new Date('2021-09-09T10:10:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'м. Збараж, Тернопільська обл.',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '1',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 sku: 'BBAK01-A',
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentMethod: 'stripe',
//         paymentStatus: 'paid',
//         status: 'shipped',
//         trackingCode: null,
//         totalAmount: 100,
//         updatedAt: new Date('2021-09-09T10:10:45.475Z')
//     },
//     {
//         id: '1111',
//         createdAt: new Date('2021-05-21T02:02:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'м. Збараж, Тернопільська обл.',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '7',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 sku: 'BBAK01-A',
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentId: 'OTIK283L',
//         paymentMethod: 'debit',
//         paymentStatus: 'paid',
//         status: 'returned',
//         trackingCode: null,
//         totalAmount: 60,
//         updatedAt: new Date('2021-05-21T02:02:45.475Z')
//     },
//     {
//         id: '2475',
//         createdAt: new Date('2021-05-11T02:02:45.475Z'),
//         currency: 'UAH',
//         currencySymbol: '\u20B4',
//         address: 'м. Збараж, Тернопільська обл.',
//         customer: {
//             instagram: "https://instagram.com/ruslana_heida?utm_medium=copy_link",
//             phone: '6035550123',
//             firstName: 'Чайка',
//             lastName: 'Чайківська',
//             middleName: 'Іванівна'
//         },
//         courier: {
//             name: 'Nova Poshta',
//             branchNumber: '6',
//         },
//         discountAmount: 0,
//         lineItems: [
//             {
//                 currency: 'UAH',
//                 discountAmount: 0,
//                 image: '/static/product-01.png',
//                 name: 'Watch with Leather Strap',
//                 quantity: 1,
//                 sku: 'BBAK01-A',
//                 subtotalAmount: 160,
//                 taxAmount: 32.5,
//                 totalAmount: 192.5,
//                 unitAmount: 160
//             }
//         ],
//         paymentMethod: 'paypal',
//         paymentStatus: 'paid',
//         status: 'placed',
//         trackingCode: null,
//         totalAmount: 1200,
//         updatedAt: new Date('2021-05-11T02:02:45.475Z')
//     }
// ];

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
