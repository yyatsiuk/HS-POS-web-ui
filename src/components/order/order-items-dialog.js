import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Typography
} from "@material-ui/core";
import {Fragment} from "react";
import {AutocompleteField} from "../autocomplete-field";
import {InputField} from "../input-field";
import {currency} from "../../config";
import {Trash as TrashIcon} from "../../icons/trash";
import {Plus as PlusIcon} from "../../icons/plus";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import numeral from 'numeral';
import {orderApi} from "../../api/order";

export const OrderItemsDialog = (props) => {
    const {open, onClose, onUpdate, products, lineItems, orderId} = props;
    const {t} = useTranslation();

    const items = lineItems.map(it => {
        return {
            id: it.productId,
            name: it.name,
            quantity: it.quantity,
            discountAmount: it.discountAmount,
            price: it.unitAmount
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            items: items || [
                {
                    id: '',
                    name: '',
                    price: '',
                    quantity: 1,
                    discountAmount: 0
                }
            ],
            submit: null
        },
        validationSchema: Yup.object().shape({
            items: Yup.array().of(Yup.object().shape({
                name: Yup.string().max(255).required('Name of product is required'),
                quantity: Yup.number().min(1).required('Quantity is required'),
            })),
        }),
        onSubmit: async (values, helpers) => {
            try {

                const updatedOrder = await orderApi.partialUpdateOrder(orderId, {
                    items: values.items.map(item => {
                        return {
                            productId: item.id,
                            quantity: item.quantity,
                            discountAmount: item.discountAmount
                        }
                    })
                });

                console.log(updatedOrder);
                toast.success(t('Order updated'));
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                console.log("OnUpdate");
                onUpdate(prevState => {
                    return {
                        ...prevState, data: {
                            ...prevState.data,
                            lineItems: updatedOrder.lineItems,
                            totalAmount: updatedOrder.totalAmount,
                            subtotalAmount: updatedOrder.subtotalAmount
                        }
                    }
                });
                onClose();
            } catch (err) {
                console.error(err);
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
                onClose();
            }
        }
    });

    const productsFormatted = products.map(product => {
        return {
            id: product.id,
            label: product.name,
            price: product.price
        }
    })

    const getItemError = (index, property) => formik?.touched?.items
        && formik?.errors?.items
        && formik?.touched?.items[index]?.[property]
        && formik?.errors?.items[index]?.[property];

    const handleAddItem = () => {
        formik.setFieldValue('items', [
            ...formik.values.items, {
                id: '',
                name: '',
                price: '',
                quantity: 1
            }
        ]);
    };

    const handleDeleteItem = (itemIndex) => {
        if (formik.values.items.length > 1) {
            formik.setFieldValue('items',
                formik.values.items.filter((item, index) => index !== itemIndex));
        }
    };

    const totalPrice = formik.values.items.reduce((acc, item) => acc
        + (Number.parseFloat(item.price) * item.quantity), 0);

    return (
        <Dialog
            onClose={onClose}
            open={open}
            maxWidth="md"
            PaperProps={{
                sx: {
                    width: '100%'
                }
            }}
            TransitionProps={{
                onExited: () => formik.resetForm()
            }}
        >
            <DialogTitle>
                {t("Edit Order Items")}
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                >
                    {formik.values.items.map((item, index) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={index}>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <AutocompleteField
                                        error={Boolean(getItemError(index, 'name'))}
                                        helperText={getItemError(index, 'name')}
                                        fullWidth
                                        filterSelectedOptions
                                        label={t("Item")}
                                        name={`items[${index}].name`}
                                        onBlur={formik.handleBlur}
                                        value={item.name}
                                        onChange={(event, value) => {
                                            if (value) {
                                                formik.setFieldValue(`items[${index}].id`, value.id);
                                                formik.setFieldValue(`items[${index}].name`, value.label);
                                                formik.setFieldValue(`items[${index}].price`, value.price);
                                            }
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            if (value === null || value === undefined) {
                                                return true;
                                            } else {
                                                return option.label === value;
                                            }
                                        }}
                                        placeholder={t("Item Name")}
                                        options={productsFormatted}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    sx={{display: 'flex'}}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid
                                            item
                                            xs={4}
                                        >
                                            <InputField
                                                error={Boolean(getItemError(index, 'quantity'))}
                                                fullWidth
                                                helperText={getItemError(index, 'quantity')}
                                                label={t("Qty")}
                                                name={`items[${index}].quantity`}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={item.quantity}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                        >
                                            <InputField
                                                disabled
                                                fullWidth
                                                label={t("Total")}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={Number.isNaN(totalPrice) ? '' : totalPrice}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start">{currency.symbol}</InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box
                                        sx={{
                                            ml: 2,
                                            mt: 3
                                        }}
                                    >
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleDeleteItem(index)}
                                            type="button"
                                        >
                                            <TrashIcon/>
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Fragment>
                        );
                    })}
                    <Grid
                        item
                        xs={12}
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Button
                            color="primary"
                            onClick={handleAddItem}
                            startIcon={<PlusIcon fontSize="small"/>}
                            variant="text"
                        >
                            {t("Add Item")}
                        </Button>
                        <Box sx={{flexGrow: 1}}/>
                        <Typography
                            color="textSecondary"
                            sx={{mr: 1}}
                            variant="subtitle2"
                        >
                            {t("Final Total")}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h6"
                        >
                            {`${currency.symbol}${numeral(totalPrice).format('0,0.00')}`}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={onClose}
                    variant="text"
                >
                    {t("Cancel")}
                </Button>
                <Button
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                    variant="contained"
                >
                    {t("Save Changes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

OrderItemsDialog.defaultProps = {
    open: false
};

OrderItemsDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    order: PropTypes.object
};
