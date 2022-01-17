import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Button, Card, Container, Divider, Typography} from '@material-ui/core';
import {customerApi} from '../api/customer';
import {CustomerDialog} from '../components/customer/customer-dialog';
import {CustomersFilter} from '../components/customer/customers-filter';
import {CustomersTable} from '../components/customer/customers-table';
import {useSelection} from '../hooks/use-selection';
import {Plus as PlusIcon} from '../icons/plus';
import gtm from '../lib/gtm';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";

export const Customers = () => {
    const [controller, setController] = useState({
        filters: [],
        page: 0,
        query: '',
        sort: 'desc',
        sortBy: 'createdAt',
        view: 'all'
    });
    const [customersState, setCustomersState] = useState({isLoading: true});
    const [
        selectedCustomers,
        handleSelect,
        handleSelectAll
    ] = useSelection(customersState.data?.customers);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const {t} = useTranslation();
    const requestMethod = useHttp();

    const getCustomers = () => customerApi.getCustomers({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view
    });

    useEffect(() => {
        if (!openCreateDialog) {
            requestMethod(getCustomers, setCustomersState).catch(console.error);
        }
    }, [openCreateDialog]);

    useEffect(() => {
        requestMethod(getCustomers, setCustomersState).catch(console.error);
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

    const handleDelete = (id) => {
        setCustomersState(prevState => {
            return {
                ...prevState, data: {
                    customers: prevState.data.customers.filter(customer => customer.id !== id),
                    customersCount: prevState.data.customersCount - 1
                }
            }
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
                <title>Customer: List | HS-POS Dashboard</title>
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
                                {t("Customers")}
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
                        <CustomersFilter
                            disabled={customersState.isLoading}
                            filters={controller.filters}
                            onFiltersApply={handleFiltersApply}
                            onFiltersClear={handleFiltersClear}
                            onQueryChange={handleQueryChange}
                            onViewChange={handleViewChange}
                            query={controller.query}
                            selectedCustomers={selectedCustomers}
                            view={controller.view}
                        />
                        <Divider/>
                        <CustomersTable
                            customers={customersState.data?.customers}
                            customersCount={customersState.data?.customersCount}
                            error={customersState.error}
                            isLoading={customersState.isLoading}
                            onPageChange={handlePageChange}
                            onSelect={handleSelect}
                            onSelectAll={handleSelectAll}
                            onSortChange={handleSortChange}
                            page={controller.page + 1}
                            selectedCustomers={selectedCustomers}
                            sort={controller.sort}
                            sortBy={controller.sortBy}
                            onDelete={handleDelete}
                        />
                    </Card>
                </Container>
            </Box>
            <CustomerDialog
                onClose={() => setOpenCreateDialog(false)}
                open={openCreateDialog}
            />
        </>
    );
};
