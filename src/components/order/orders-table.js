import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {format} from 'date-fns';
import numeral from 'numeral';
import {
    Box,
    Checkbox,
    Divider,
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
import {ResourceError} from '../resource-error';
import {Pagination} from '../pagination';
import {ResourceUnavailable} from '../resource-unavailable';
import {Scrollbar} from '../scrollbar';
import {Status} from '../status';
import {OrderMenu} from './order-menu';
import {useTranslation} from "react-i18next";

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
        value: 'placed'
    },
    {
        color: 'secondary.dark',
        label: 'In Progress',
        value: 'inProgress'
    },
    {
        color: 'secondary.light',
        label: "Ready for Shipment",
        value: "ready"
    },
    {
        color: 'info.dark',
        label: 'Shipped',
        value: 'shipped'
    },
    {
        color: 'info.light',
        label: 'Delivered',
        value: 'delivered'
    },
    {
        color: 'success.main',
        label: 'Complete',
        value: 'complete'
    },
    {
        color: 'error.main',
        label: 'Returned',
        value: 'returned'
    }
];

export const OrdersTable = (props) => {
    const {
        error,
        isLoading,
        onPageChange,
        onSelect,
        onSelectAll,
        onSortChange,
        orders,
        ordersCount,
        page,
        selectedOrders,
        sort,
        sortBy
    } = props;
    const {t} = useTranslation();

    const displayLoading = isLoading;
    const displayError = Boolean(!isLoading && error);
    const displayUnavailable = Boolean(!isLoading && !error && !orders.length);

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column'
            }}
        >
            <Divider/>
            <Scrollbar>
                <Table sx={{minWidth: 1000}}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={orders.length > 0 && selectedOrders.length === orders.length}
                                    disabled={isLoading}
                                    indeterminate={selectedOrders.length > 0
                                    && selectedOrders.length < orders.length}
                                    onChange={onSelectAll}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={sortBy === column.id}
                                        direction={sortBy === column.id ? sort : 'asc'}
                                        disabled={isLoading}
                                        onClick={(event) => onSortChange(event, column.id)}
                                    >
                                        {t(column.label)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            const statusVariant = statusVariants.find((variant) => variant.value
                                === order.status);

                            return (
                                <TableRow
                                    hover
                                    key={order.id}
                                    selected={!!selectedOrders.find((selectedCustomer) => selectedCustomer
                                        === order.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={!!selectedOrders.find((selectedCustomer) => selectedCustomer
                                                === order.id)}
                                            onChange={(event) => onSelect(event, order.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            color="inherit"
                                            component={RouterLink}
                                            to="/dashboard/orders/1"
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
                                            to="/dashboard/customers/1"
                                            underline="none"
                                            variant="inherit"
                                        >
                                            {`${order.customer.lastName} ${order.customer.firstName} ${order.customer.middleName}`}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {order.customer.phone}
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
                                            {`${t(order.courier.name)}, #${order.courier.branchNumber}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Status
                                            color={statusVariant.color}
                                            label={t(statusVariant.label)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {order.currencySymbol}{numeral(order.totalAmount).format(`0,0.00`)}
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
                    error={error}
                    sx={{
                        flexGrow: 1,
                        m: 2
                    }}
                />
            )}
            {displayUnavailable && (
                <ResourceUnavailable
                    sx={{
                        flexGrow: 1,
                        m: 2
                    }}
                />
            )}
            <Divider sx={{mt: 'auto'}}/>
            <Pagination
                disabled={isLoading}
                onPageChange={onPageChange}
                page={page}
                rowsCount={ordersCount}
            />
        </Box>
    );
};

OrdersTable.defaultProps = {
    orders: [],
    ordersCount: 0,
    page: 1,
    selectedOrders: [],
    sort: 'desc',
    sortBy: 'createdAt'
};

OrdersTable.propTypes = {
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    onPageChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSortChange: PropTypes.func,
    orders: PropTypes.array,
    ordersCount: PropTypes.number,
    page: PropTypes.number,
    selectedOrders: PropTypes.array,
    sort: PropTypes.oneOf(['asc', 'desc']),
    sortBy: PropTypes.string
};
