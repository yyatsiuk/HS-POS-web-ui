import PropTypes from 'prop-types';
import {Box, Button, Card, CardHeader, Divider, Grid, Link} from '@material-ui/core';
import {PropertyList} from '../property-list';
import {PropertyListItem} from '../property-list-item';
import {useTranslation} from "react-i18next";
import {extractInstagramName} from "../../utils/input-formatter";

const statusVariants = [
    {
        label: 'Placed',
        value: 'PLACED'
    },
    {
        label: 'In Progress',
        value: 'IN_PROGRESS'
    },
    {
        label: "Ready for Shipment",
        value: "READY_FOR_SHIPMENT"
    },
    {
        label: 'Shipped',
        value: 'SHIPPED'
    },
    {
        label: 'Delivered',
        value: 'DELIVERED'
    },
    {
        label: 'Complete',
        value: 'COMPLETE'
    },
    {
        label: 'Returned',
        value: 'RETURNED'
    }
];

const paymentStatusVariants = [
    {
        label: 'Paid',
        value: 'PAID'
    },
    {
        label: 'Unpaid',
        value: 'UNPAID'
    },
    {
        label: 'Prepayment',
        value: 'PREPAYMENT'
    }
]


export const OrderInfo = (props) => {
    const {order, onEdit, ...other} = props;
    console.log(order);
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
                            value={`${order.customer.fullName}`}
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
                            value={`${order.address}, ${t(order.courier)} #${order.branchNumber}`}
                        />
                    </PropertyList>
                    <PropertyListItem
                        label={t("Payment Status")}
                        value={t(paymentVariant.label)}
                    />
                </Grid>
            </Grid>
            {order.note && (
                <Grid container>
                    <PropertyListItem
                        label={t("Additional Notes")}
                        value={t(order.note)}
                    />
                </Grid>
            )}

        </Card>
    );
};

OrderInfo.propTypes = {
    onEdit: PropTypes.func,
    order: PropTypes.object.isRequired
};
