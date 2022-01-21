import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Button, Card, Container, Divider, Typography} from '@material-ui/core';
import {productApi} from '../api/product';
import {ProductCreateDialog} from '../components/product/product-create-dialog';
import {ProductsFilter} from '../components/product/products-filter';
import {ProductsTable} from '../components/product/products-table';
import {useSelection} from '../hooks/use-selection';
import {Plus as PlusIcon} from '../icons/plus';
import gtm from '../lib/gtm';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";

export const Products = () => {
    const [controller, setController] = useState({
        filters: [],
        page: 0,
        query: '',
        sort: 'desc',
        sortBy: 'updatedAt',
        view: 'all'
    });
    const [productsState, setProductsState] = useState({isLoading: true});
    const [categoriesState, setCategoriesState] = useState({isLoading: true});
    const [
        selectedProducts,
        handleSelect,
        handleSelectAll
    ] = useSelection(productsState.data?.products);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const httpRequest = useHttp();
    const {t} = useTranslation();

    const getProducts = () => productApi.getProducts({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view
    });
    const getCategories = () => productApi.getAllCategories();

    useEffect(() => {
        if (!openCreateDialog) {
            httpRequest(getProducts, setProductsState).catch(console.error);
            httpRequest(getCategories, setCategoriesState).catch(console.error);
        }
    }, [openCreateDialog]);

    useEffect(() => {
        httpRequest(getProducts, setProductsState).catch(console.error);
        httpRequest(getCategories, setCategoriesState).catch(console.error);
    }, [controller]);

    const handleDelete = (id) => {
        setProductsState(prevState => {
            return {
                ...prevState, data: {
                    products: prevState.data.products.filter(product => product.id !== id),
                    productsCount: prevState.data.productsCount - 1
                }
            }
        });
    };

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    const handleViewChange = (newView) => {
        setController({
            ...controller,
            page: 0,
            view: newView
        });
    };

    const handleQueryChange = (newQuery) => {
        setController({
            ...controller,
            page: 0,
            query: newQuery
        });
    };

    const handleFiltersApply = (newFilters) => {
        const parsedFilters = newFilters.map((filter) => ({
            property: filter.property.name,
            value: filter.value,
            operator: filter.operator.value
        }));

        setController({
            ...controller,
            page: 0,
            filters: parsedFilters
        });
    };

    const handleFiltersClear = () => {
        setController({
            ...controller,
            page: 0,
            filters: []
        });
    };

    const handlePageChange = (newPage) => {
        setController({
            ...controller,
            page: newPage - 1
        });
    };

    const handleSortChange = (event, property) => {
        const isAsc = controller.sortBy === property && controller.sort === 'asc';

        setController({
            ...controller,
            page: 0,
            sort: isAsc ? 'desc' : 'asc',
            sortBy: property
        });
    };

    return (
        <>
            <Helmet>
                <title>Product: List | HS-POS Dashboard</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <Box sx={{py: 4}}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                {t("Products")}
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>
                            <Button
                                color="primary"
                                onClick={() => setOpenCreateDialog(true)}
                                size="large"
                                startIcon={<PlusIcon fontSize="small"/>}
                                variant="contained"
                            >
                                {t("Add")}
                            </Button>
                        </Box>
                    </Box>
                    <Card
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1
                        }}
                    >
                        <ProductsFilter
                            disabled={productsState.isLoading}
                            filters={controller.filters}
                            onFiltersApply={handleFiltersApply}
                            onFiltersClear={handleFiltersClear}
                            onQueryChange={handleQueryChange}
                            onViewChange={handleViewChange}
                            query={controller.query}
                            selectedProducts={selectedProducts}
                            view={controller.view}
                        />
                        <Divider/>
                        <ProductsTable
                            error={productsState.error}
                            isLoading={productsState.isLoading}
                            onPageChange={handlePageChange}
                            onSelect={handleSelect}
                            onSelectAll={handleSelectAll}
                            onSortChange={handleSortChange}
                            page={controller.page + 1}
                            products={productsState.data?.products}
                            productsCount={productsState.data?.productsCount}
                            selectedProducts={selectedProducts}
                            sort={controller.sort}
                            sortBy={controller.sortBy}
                            onDelete={handleDelete}
                        />
                    </Card>
                </Container>
            </Box>
            <ProductCreateDialog
                onClose={() => setOpenCreateDialog(false)}
                open={openCreateDialog}
                categories={categoriesState.data || []}
            />
        </>
    );
};
