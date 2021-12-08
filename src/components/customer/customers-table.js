import {useEffect, useState} from 'react';
import Proptypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {format} from 'date-fns';
import {
    Avatar,
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
    TableSortLabel
} from '@material-ui/core';
import {Pagination} from '../pagination';
import {ResourceError} from '../resource-error';
import {ResourceUnavailable} from '../resource-unavailable';
import {Scrollbar} from '../scrollbar';
import {CustomerMenu} from './customer-menu';
import {useTranslation} from "react-i18next";
import {extractInstagramName, stringAvatar} from "../../utils/input-formatter";

const columns = [
    {
        id: 'fullName',
        disablePadding: true,
        label: 'Full Name'
    },
    {
        id: 'phone',
        label: 'Phone'
    },
    {
        id: 'instagram',
        label: 'Instagram'
    },
    {
        id: 'createdAt',
        label: 'Created'
    },
    {
        id: 'edit',
        label: ''
    }
];

export const CustomersTable = (props) => {
    const {
        customers: customersProp,
        customersCount,
        error,
        isLoading,
        onPageChange,
        onSelect,
        onSelectAll,
        onSortChange,
        page,
        selectedCustomers,
        sort,
        sortBy
    } = props;
    const [customers, setCustomers] = useState(customersProp);
    const {t} = useTranslation();

    useEffect(() => {
        setCustomers(customersProp);
    }, [customersProp]);

    const displayLoading = isLoading;
    const displayError = Boolean(!isLoading && error);
    const displayUnavailable = Boolean(!isLoading && !error && !customers?.length);

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}
        >
            <Scrollbar>
                <Table sx={{minWidth: 1000}}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={customers?.length > 0
                                    && selectedCustomers.length === customers?.length}
                                    disabled={isLoading}
                                    indeterminate={selectedCustomers.length > 0
                                    && selectedCustomers.length < customers?.length}
                                    onChange={onSelectAll}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    padding={column.disablePadding ? 'none' : 'normal'}
                                >
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers?.map((customer) => (
                            <TableRow
                                hover
                                key={customer.id}
                                selected={!!selectedCustomers.find((selectedCustomer) => selectedCustomer
                                    === customer.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={!!selectedCustomers.find((selectedCustomer) => selectedCustomer
                                            === customer.id)}
                                        onChange={(event) => onSelect(event, customer.id)}
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Avatar {...stringAvatar(customer.fullName, 36 ,36)} />
                                        <Link
                                            color="inherit"
                                            component={RouterLink}
                                            to="/dashboard/customers/1"
                                            underline="none"
                                            variant="subtitle2"
                                        >
                                            {customer.fullName}
                                        </Link>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {customer.phone}
                                </TableCell>
                                <TableCell>
                                    <Link href={customer.instagram} target="_blank">
                                        {extractInstagramName(customer.instagram)}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {format(customer.createdAt, 'dd/MM/yyyy HH:mm')}
                                </TableCell>
                                <TableCell align="right">
                                    <CustomerMenu/>
                                </TableCell>
                            </TableRow>
                        ))}
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
                rowsCount={customersCount}
            />
        </Box>
    );
};

CustomersTable.defaultProps = {
    customers: [],
    customersCount: 0,
    page: 1,
    selectedCustomers: [],
    sort: 'desc',
    sortBy: 'createdAt'
};

CustomersTable.propTypes = {
    customers: Proptypes.array,
    customersCount: Proptypes.number,
    error: Proptypes.string,
    isLoading: Proptypes.bool,
    onPageChange: Proptypes.func,
    onSelect: Proptypes.func,
    onSelectAll: Proptypes.func,
    onSortChange: Proptypes.func,
    page: Proptypes.number,
    selectedCustomers: Proptypes.array,
    sort: Proptypes.oneOf(['asc', 'desc']),
    sortBy: Proptypes.string
};
