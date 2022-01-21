import PropTypes from 'prop-types';
import {Box, Button, Card, CardHeader, Divider, useMediaQuery} from '@material-ui/core';
import {PropertyList} from '../property-list';
import {PropertyListItem} from '../property-list-item';
import {useTranslation} from "react-i18next";
import {currency} from "../../config";
import numeral from "numeral";

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

export const ProductInfo = (props) => {
    const {onEdit, product, ...other} = props;
    const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {t} = useTranslation();

    const status = statusVariants.find((variant) => variant.value === product.status);

    const align = mdDown ? 'vertical' : 'horizontal';

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
                title={t("General Information")}
            />
            <Divider/>
            <PropertyList>
                <PropertyListItem label={t("Image")} align={align}>
                    <Box
                        sx={{
                            borderRadius: 1,
                            boxShadow: '0 0 0 1px rgba(24, 33, 77, 0.23)',
                            display: 'flex',
                            position: 'relative',
                            width: 'fit-content',
                            '& img': {
                                borderRadius: 1,
                                display: 'block',
                                maxWidth: 126
                            }
                        }}
                    >
                        <img
                            alt={product.name}
                            src={product.imageUrl}
                        />
                    </Box>
                </PropertyListItem>
                <PropertyListItem
                    align={align}
                    label={t("Code")}
                    value={product.code}
                />
                <PropertyListItem
                    align={align}
                    label={t("Product Name")}
                    value={product.name}
                />
                <PropertyListItem
                    align={align}
                    label={t("Price")}
                    value={`${currency.symbol}${numeral(product.price).format(`0,0.00`)}`}
                />
                <PropertyListItem
                    align={align}
                    label={t("Description")}
                    value={product.description}
                />
                <PropertyListItem
                    align={align}
                    label={t("Status")}
                    value={t(status.label)}
                />
                <PropertyListItem
                    align={align}
                    label={t("Category")}
                    value={t(product.category)}
                />
                <PropertyListItem
                    align={align}
                    label={t("Created Date")}
                    value={t("formattedDate", {date: new Date(product.createdAt)})}
                />
                <PropertyListItem
                    align={align}
                    label={t("Updated")}
                    value={t("formattedDate", {date: new Date(product.updatedAt)})}
                />
            </PropertyList>
        </Card>
    );
};

ProductInfo.propTypes = {
    onEdit: PropTypes.func,
    product: PropTypes.object.isRequired
};
