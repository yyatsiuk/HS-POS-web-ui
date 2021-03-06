import PropTypes from 'prop-types';
import numeral from 'numeral';
import {Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import {Scrollbar} from '../scrollbar';
import {useTranslation} from "react-i18next";
import {currency} from "../../config";

export const OrderSummary = (props) => {
    const {order, ...other} = props;
    const {t} = useTranslation();

    return (
        <Scrollbar>
            <Table
                sx={{minWidth: 500}}
                {...other}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {t("Name")}
                        </TableCell>
                        <TableCell>
                            {t("Cost")}
                        </TableCell>
                        <TableCell>
                            {t("Qty")}
                        </TableCell>
                        <TableCell>
                            {t("Total")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.lineItems.map((lineItem) => (
                        <TableRow key={lineItem.code}>
                            <TableCell>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex'
                                    }}
                                >
                                    <Avatar
                                        src={lineItem.imageUrl}
                                        sx={{
                                            height: 48,
                                            mr: 2,
                                            width: 48
                                        }}
                                        variant="rounded"
                                    />
                                    <div>
                                        <Typography
                                            color="textPrimary"
                                            variant="body2"
                                        >
                                            {lineItem.name}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            {`Code: ${lineItem.code}`}
                                        </Typography>
                                    </div>
                                </Box>
                            </TableCell>
                            <TableCell>
                                {`${currency.symbol}${numeral(lineItem.unitAmount).format(0, 0.00)}`}
                            </TableCell>
                            <TableCell>
                                {lineItem.quantity}
                            </TableCell>
                            <TableCell>
                                {`${currency.symbol}${numeral(lineItem.totalAmount).format(0, 0.00)}`}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            {t("Subtotal")}
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>
                            {`${currency.symbol}${numeral(order.subtotalAmount).format(0, 0.00)}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            {t("Prepayment")}
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>
                            {`${currency.symbol}${numeral(order.prepaymentAmount).format(0, 0.00)}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            {t("Discount (%)")}
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>
                            {`${currency.symbol}${numeral(order.discountAmount).format(0, 0.00)}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                {t("Total")}
                            </Typography>
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                {`${currency.symbol}${numeral(order.totalAmount).format(0, 0.00)}`}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Scrollbar>
    );
};

OrderSummary.propTypes = {
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    order: PropTypes.object
};
