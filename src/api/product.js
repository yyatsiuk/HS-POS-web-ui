import {subDays, subHours, subMinutes} from 'date-fns';
import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

const now = new Date();

const emptyProduct = {
    id: '6541237',
    code: 'HSLE2KLPMF',
    createdAt: subDays(subHours(subMinutes(now, 60), 13), 30),
    description: 'The Core Collection. Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish.',
    imageUrl: '/static/product-01.png',
    name: 'Watch With Leather Strap',
    price: 160,
    category: "Electronics",
    status: 'IN_STOCK',
    updatedAt: new Date()
};

class ProductApi {
    async getProducts(options) {
        let products = [];
        try {
            const response = await fetch(coreApi.productsUrl);
            products = await response.json();
            console.log(products);
        } catch (error) {
            console.log(error);
            return products;
        }

        const {filters, sort, sortBy, page, query, view} = options;

        /*
         NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
         Since this does not connect to a real backend, we simulate these operations.
         */

        const queriedProducts = products.filter((_product) => {
            if (!!query && !_product.name.toLowerCase().includes(query.toLowerCase())) {
                return false;
            }

            // No need to look for any resource fields
            if (typeof view === 'undefined' || view === 'all') {
                return true;
            }

            // In this case, the view represents the resource status
            return _product.status === view;
        });
        const filteredProducts = applyFilters(queriedProducts, filters);
        const sortedProducts = applySort(filteredProducts, sort, sortBy);
        const paginatedProducts = applyPagination(sortedProducts, page);

        return Promise.resolve({
            products: paginatedProducts,
            productsCount: filteredProducts.length
        });
    }

    async getProduct(id) {
        if (id === null) {
            return emptyProduct;
        }

        try {
            const response = await fetch(`${coreApi.productsUrl}/${id}`);
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createProduct(payload) {
        try {
            console.log(payload);
            const response = await fetch(coreApi.productsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            console.log(response.headers.location);
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async updateProduct(payload, id) {
        try {
            console.log(payload);
            const response = await fetch(`${coreApi.productsUrl}/${id}`, {
                method: "PUT",
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

    async getAllCategories() {
        let categories = [];
        try {
            const response = await fetch(coreApi.productCategoriesUrl);
            categories = await response.json();
        } catch (error) {
            console.log(error);
            return categories;
        }

        return categories;
    }

    async deleteProduct(productId) {
        try {
            await fetch(`${coreApi.productsUrl}/${productId}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }
}

export const productApi = new ProductApi();
