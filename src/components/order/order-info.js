import PropTypes from 'prop-types';
import {Box, Button, Card, CardHeader, Divider, Grid, Link} from '@material-ui/core';
import {PropertyList} from '../property-list';
import {PropertyListItem} from '../property-list-item';
import {useTranslation} from "react-i18next";

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

export const OrderInfo = (props) => {
    const {order, onEdit, ...other} = props;
    const statusVariant = statusVariants.find((variant) => variant.value === order.status);
    const {t} = useTranslation();

    const extractInstagramName = (link) => {
        return link.split("https://instagram.com/")[1]
            .split("?")[0];
    }

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
                            value={`${order.customer.firstName} ${order.customer.lastName}`}
                        />
                        <PropertyListItem
                            label="Instagram"
                            value={
                                <Link href={order.customer.instagram} target="_blank">
                                    {"@" + extractInstagramName(order.customer.instagram)}
                                </Link>
                            }
                        />
                        <PropertyListItem
                            label={t("Phone")}
                            value={order.customer.phone}
                        />
                        <PropertyListItem
                            label={t("Payment Status")}
                            value={order.customer.paymentStatus}
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
                            value={statusVariant.label}
                        />
                        <PropertyListItem
                            label={t("Delivery Address")}
                            value={order.customer.address}
                        />
                        <PropertyListItem
                            label={t("Nova Poshta #")}
                            value={order.customer.novaPoshtaNumber}
                        />
                    </PropertyList>
                </Grid>
            </Grid>
        </Card>
    );
};

OrderInfo.propTypes = {
    onEdit: PropTypes.func,
    order: PropTypes.object.isRequired
};
