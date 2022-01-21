import Proptypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {format, parseISO} from 'date-fns';
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
    TableSortLabel,
    Typography
} from '@material-ui/core';
import {Pagination} from '../pagination';
import {ResourceError} from '../resource-error';
import {ResourceUnavailable} from '../resource-unavailable';
import {Scrollbar} from '../scrollbar';
import {Status} from '../status';
import {ProductMenu} from './product-menu';
import {useTranslation} from "react-i18next";
import numeral from "numeral";
import {currency} from "../../config";

const columns = [
    {
        id: 'name',
        label: 'Name'
    },
    {
        id: 'price',
        label: 'price'
    },
    {
        id: 'category',
        label: 'category'
    },
    {
        id: 'updatedAt',
        label: 'Updated'
    },
    {
        id: 'status',
        label: 'Status'
    }
];

const statusVariants = [
    {
        label: "In Stock",
        value: "IN_STOCK",
        color: "success.main"
    },
    {
        label: "Out of Stock",
        value: "OUT_OF_STOCK",
        color: "warning.main"
    }
]

export const ProductsTable = (props) => {
    const {
        error,
        isLoading,
        onPageChange,
        onSelect,
        onSelectAll,
        onSortChange,
        page,
        products,
        productsCount,
        selectedProducts,
        sort,
        sortBy,
        onDelete
    } = props;

    const displayLoading = isLoading;
    const displayError = Boolean(!isLoading && error);
    const displayUnavailable = Boolean(!isLoading && !error && !products.length);
    const {t} = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}
        >
            <Scrollbar>
                <Table sx={{minWidth: 800}}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={products.length > 0
                                        && selectedProducts.length === products.length}
                                    disabled={isLoading}
                                    indeterminate={selectedProducts.length > 0
                                        && selectedProducts.length < products.length}
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
                        {products.map((product) => {
                            const statusVariant = statusVariants.find((variant) => variant.value
                                === product.status);

                            return (
                                <TableRow
                                    hover
                                    key={product.id}
                                    selected={!!selectedProducts.find((selectedCustomer) => selectedCustomer
                                        === product.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={!!selectedProducts.find((selectedCustomer) => selectedCustomer
                                                === product.id)}
                                            onChange={(event) => onSelect(event, product.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                alt={product.name}
                                                src={product.imageUrl}
                                                sx={{
                                                    width: 64,
                                                    height: 64
                                                }}
                                                variant="rounded"
                                            />
                                            <Box sx={{ml: 2}}>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    sx={{display: 'block'}}
                                                    to={`/dashboard/products/${product.id}`}
                                                    underline="none"
                                                    variant="subtitle2"
                                                >
                                                    {product.name}
                                                </Link>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {currency.symbol}{numeral(product.price).format(`0,0.00`)}
                                    </TableCell>
                                    <TableCell>
                                        {t(product.category)}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <Typography
                                                color="inherit"
                                                variant="body2"
                                            >
                                                {t("formattedDate", {date: new Date(product.updatedAt)})}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {format(parseISO(product.updatedAt), 'HH:mm')}
                                            </Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Status
                                            color={statusVariant.color}
                                            label={t(statusVariant.label)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <ProductMenu productId={product.id} onDelete={onDelete}/>
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
                rowsCount={productsCount}
            />
        </Box>
    );
};

ProductsTable.defaultProps = {
    page: 1,
    products: [],
    productsCount: 0,
    selectedProducts: [],
    sort: 'desc',
    sortBy: 'createdAt'
};

ProductsTable.propTypes = {
    error: Proptypes.string,
    isLoading: Proptypes.bool,
    onPageChange: Proptypes.func,
    onSelect: Proptypes.func,
    onSelectAll: Proptypes.func,
    onSortChange: Proptypes.func,
    page: Proptypes.number,
    products: Proptypes.array,
    productsCount: Proptypes.number,
    selectedProducts: Proptypes.array,
    sort: Proptypes.oneOf(['asc', 'desc']),
    sortBy: Proptypes.string
};
