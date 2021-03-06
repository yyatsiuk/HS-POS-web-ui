import {useCallback, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {format} from 'date-fns';
import numeral from 'numeral';
import {
    Box,
    Card,
    Link,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@material-ui/core';
import {customerApi} from '../api/customer';
import {ResourceError} from '../components/resource-error';
import {ResourceUnavailable} from '../components/resource-unavailable';
import {Scrollbar} from '../components/scrollbar';
import {Status} from '../components/status';
import gtm from '../lib/gtm';
import {OrderMenu} from "../components/order/order-menu";
import {useTranslation} from "react-i18next";
import {currency} from "../config";
import useHttp from "../hooks/use-http";

const columns = [
    {
        id: 'id',
        label: 'Order ID'
    },
    {
        id: 'createdAt',
        label: 'Created'
    },
    {
        id: 'customer',
        label: 'Customer'
    },
    {
        id: 'phone',
        label: 'Phone'
    },
    {
        id: 'address',
        label: 'Delivery Address'
    },
    {
        id: 'status',
        label: 'Status'
    },
    {
        id: 'totalAmount',
        label: 'Total'
    }
];


const statusVariants = [
    {
        color: 'warning.main',
        label: 'Placed',
        value: 'PLACED'
    },
    {
        color: 'secondary.dark',
        label: 'In Progress',
        value: 'IN_PROGRESS'
    },
    {
        color: 'secondary.light',
        label: "Ready for Shipment",
        value: "READY_FOR_SHIPMENT"
    },
    {
        color: 'info.dark',
        label: 'Shipped',
        value: 'SHIPPED'
    },
    {
        color: 'info.light',
        label: 'Delivered',
        value: 'DELIVERED'
    },
    {
        color: 'success.main',
        label: 'Complete',
        value: 'COMPLETE'
    },
    {
        color: 'error.main',
        label: 'Returned',
        value: 'RETURNED'
    }
];

export const CustomerOrders = () => {
    const [controller, setController] = useState({
        sort: 'desc',
        sortBy: 'createdAt'
    });
    const {customerId} = useParams();
    const [ordersState, setOrdersState] = useState({isLoading: true});
    const httpRequest = useHttp();
    const {t} = useTranslation();

    const getCustomerOrders = () => customerApi.getCustomerOrders(customerId, {
        sort: controller.sort,
        sortBy: controller.sortBy
    });

    const getOrders = useCallback(async () => {
        httpRequest(getCustomerOrders, setOrdersState).catch(console.error)
    }, [controller]);

    useEffect(() => {
        getOrders().catch(console.error);
    }, [controller]);

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    const displayLoading = ordersState.isLoading;
    const displayError = Boolean(!ordersState.isLoading && ordersState.error);
    const displayUnavailable = Boolean(!ordersState.isLoading
        && !ordersState.error
        && !ordersState.data?.length);

    const handleSortChange = (event, property) => {
        const isAsc = controller.sortBy === property && controller.sort === 'asc';

        setController({
            ...controller,
            sort: isAsc ? 'desc' : 'asc',
            sortBy: property
        });
    };

    return (
        <>
            <Helmet>
                <title>Customer: Orders | HS-POS Dashboard</title>
            </Helmet>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1
                    }}
                >
                    <Scrollbar>
                        <Table sx={{minWidth: 1000}}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            <TableSortLabel
                                                active={controller.sortBy === column.id}
                                                direction={controller.sortBy === column.id
                                                    ? controller.sort
                                                    : 'asc'}
                                                disabled={ordersState.isLoading}
                                                onClick={(event) => handleSortChange(event, column.id)}
                                            >
                                                {t(column.label)}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ordersState.data?.map((order) => {
                                    const statusVariant = statusVariants.find((variant) => variant.value
                                        === order.status);

                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`/dashboard/orders/${order.id}`}
                                                    underline="none"
                                                    variant="subtitle2"
                                                >
                                                    {`#${order.id}`}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color="inherit"
                                                    variant="inherit"
                                                >
                                                    {t("formattedDate", {date: new Date(order.createdAt)})}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="inherit"
                                                >
                                                    {format(new Date(order.createdAt), 'HH:mm')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`/dashboard/customers/${order.customer.id}`}
                                                    underline="none"
                                                    variant="inherit"
                                                >
                                                    {`${order.customer.fullName}`}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {order.phone}
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color="inherit"
                                                    variant="inherit"
                                                >
                                                    {order.address}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="inherit"
                                                >
                                                    {`${t(order.courier)}, #${order.branchNumber}`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Status
                                                    color={statusVariant.color}
                                                    label={t(statusVariant.label)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {currency.symbol}{numeral(order.totalAmount).format(`0,0.00`)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <OrderMenu/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                    {displayLoading && (
                        <Box sx={{p: 2}}>
                            <Skeleton height={42}/>
                            <Skeleton height={42}/>
                            <Skeleton height={42}/>
                        </Box>
                    )}
                    {displayError && (
                        <ResourceError
                            error={ordersState.error}
                            sx={{
                                height: '100%',
                                m: 2
                            }}
                        />
                    )}
                    {displayUnavailable && (
                        <ResourceUnavailable
                            sx={{
                                height: '100%',
                                m: 2
                            }}
                        />
                    )}
                </Card>
            </Box>
        </>
    );
};
