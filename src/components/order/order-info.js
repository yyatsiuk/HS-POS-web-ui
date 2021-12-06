import PropTypes from 'prop-types';
import {Box, Button, Card, CardHeader, Divider, Grid, Link} from '@material-ui/core';
import {PropertyList} from '../property-list';
import {PropertyListItem} from '../property-list-item';
import {useTranslation} from "react-i18next";
import {Fragment} from 'react'
import {extractInstagramName} from "../../utils/input-formatter";

const statusVariants = [
    {
        label: 'Placed',
        value: 'placed'
    },
    {
        label: 'In Progress',
        value: 'inProgress'
    },
    {
        label: "Ready for Shipment",
        value: "ready"
    },
    {
        label: 'Shipped',
        value: 'shipped'
    },
    {
        label: 'Delivered',
        value: 'delivered'
    },
    {
        label: 'Complete',
        value: 'complete'
    },
    {
        label: 'Returned',
        value: 'returned'
    }
];

const paymentStatusVariants = [
    {
        label: 'Paid',
        value: 'paid'
    },
    {
        label: 'Unpaid',
        value: 'unpaid'
    },
    {
        label: 'Prepayment',
        value: 'prepayment'
    }
]


export const OrderInfo = (props) => {
    const {order, onEdit, ...other} = props;
    const statusVariant = statusVariants.find((variant) => variant.value === order.status);
    const paymentVariant = paymentStatusVariants.find((paymentStatus) => paymentStatus.value === order.paymentStatus);
    const {t} = useTranslation();

    return (
        <Card
            variant="outlined"
            {...other}
        >
            <CardHeader
                action={(
                    <Button
                        color="primary"
                        onClick={onEdit}
                        variant="text"
                    >
                        {t("Edit")}
                    </Button>
                )}
                title={t("Order Info")}
            />
            <Divider/>
            <Box
                sx={{
                    px: 3,
                    py: 1.5
                }}
            >
            </Box>
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <PropertyList>
                        <PropertyListItem
                            label={t("Customer")}
                            value={`${order.customer.lastName} ${order.customer.firstName} ${order.customer.middleName}`}
                        />
                        <PropertyListItem
                            label="Instagram"
                            value={
                                <Link href={order.customer.instagram} target="_blank">
                                    {extractInstagramName(order.customer.instagram)}
                                </Link>
                            }
                        />
                        <PropertyListItem
                            label={t("Phone")}
                            value={order.customer.phone}
                        />
                    </PropertyList>
                </Grid>
                <Grid
                    item
                    sm={6}
                    xs={12}
                >
                    <PropertyList>
                        <PropertyListItem
                            label={t("Status")}
                            value={t(statusVariant.label)}
                        />
                        <PropertyListItem
                            label={t("Delivery Address")}
                            value={
                                <Fragment>
                                    <div>{order.address}</div>
                                    <div>{`${t(order.courier.name)} #${order.courier.branchNumber}`}</div>
                                </Fragment>
                            }
                        />
                    </PropertyList>
                    <PropertyListItem
                        label={t("Payment Status")}
                        value={t(paymentVariant.label)}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

OrderInfo.propTypes = {
    onEdit: PropTypes.func,
    order: PropTypes.object.isRequired
};
