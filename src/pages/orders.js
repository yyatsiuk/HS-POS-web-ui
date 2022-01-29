import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Button, Card, Container, Typography} from '@material-ui/core';
import {orderApi} from '../api/order';
import {Link as RouterLink} from 'react-router-dom';
import {OrdersFilter} from '../components/order/orders-filter';
import {OrdersTable} from '../components/order/orders-table';
import {useSelection} from '../hooks/use-selection';
import {Plus as PlusIcon} from '../icons/plus';
import gtm from '../lib/gtm';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";

export const Orders = () => {
    const [controller, setController] = useState({
        filters: [],
        page: 0,
        query: '',
        sort: 'desc',
        sortBy: 'createdAt',
        view: 'all'
    });
    const [ordersState, setOrdersState] = useState({isLoading: true});
    const [selectedOrders, handleSelect, handleSelectAll] = useSelection(ordersState.data?.orders);
    const [mode, setMode] = useState('table');
    const {t} = useTranslation();
    const requestMethod = useHttp();

    const getOrders = () => orderApi.getOrders({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view
    });

    useEffect(() => {
        requestMethod(getOrders, setOrdersState).catch(console.error);
    }, [controller]);

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

    const handleModeChange = (event, newMode) => {
        if (newMode) {
            setMode(newMode);
        }
    };

    const handleDelete = (id) => {
        setOrdersState(prevState => {
            return {
                ...prevState, data: {
                    orders: prevState.data.orders.filter(order => order.id !== id),
                    ordersCount: prevState.data.ordersCount - 1
                }
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Order: List</title>
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
                                {t("Orders")}
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>
                            <Button
                                color="primary"
                                component={RouterLink}
                                startIcon={<PlusIcon fontSize="small"/>}
                                variant="contained"
                                size="large"
                                to={"/dashboard/orders/create"}
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
                        <OrdersFilter
                            disabled={ordersState.isLoading}
                            filters={controller.filters}
                            mode={mode}
                            onFiltersApply={handleFiltersApply}
                            onFiltersClear={handleFiltersClear}
                            onModeChange={handleModeChange}
                            onQueryChange={handleQueryChange}
                            onViewChange={handleViewChange}
                            query={controller.query}
                            selectedOrders={selectedOrders}
                            view={controller.view}
                        />
                        <OrdersTable
                            error={ordersState.error}
                            isLoading={ordersState.isLoading}
                            onPageChange={handlePageChange}
                            onSelect={handleSelect}
                            onSelectAll={handleSelectAll}
                            onSortChange={handleSortChange}
                            orders={ordersState.data?.orders}
                            ordersCount={ordersState.data?.ordersCount}
                            page={controller.page + 1}
                            selectedOrders={selectedOrders}
                            sort={controller.sort}
                            sortBy={controller.sortBy}
                            onDelete={handleDelete}
                        />
                    </Card>
                </Container>
            </Box>
        </>
    );
};
