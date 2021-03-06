import {coreApi} from '../config';
import {applyFilters} from '../utils/apply-filters';
import {applyPagination} from '../utils/apply-pagination';
import {applySort} from '../utils/apply-sort';

class ProductApi {
    async getProducts(options) {
        let products = [];
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.productsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            products = await response.json();
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
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(`${coreApi.productsUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createProduct(payload) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            await fetch(coreApi.productsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unsuccessful response from the server")
        }
    }

    async updateProduct(payload, id) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(`${coreApi.productsUrl}/${id}`, {
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

    async getAllCategories() {
        let categories = [];
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await fetch(coreApi.productCategoriesUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            categories = await response.json();
        } catch (error) {
            console.log(error);
            return categories;
        }

        return categories;
    }

    async deleteProduct(productId) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            await fetch(`${coreApi.productsUrl}/${productId}`, {
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
}

export const productApi = new ProductApi();
