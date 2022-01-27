import {Fragment, useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import numeral from 'numeral';
import toast from 'react-hot-toast';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Typography
} from '@material-ui/core';
import {InputField} from '../components/input-field';
import {ArrowLeft as ArrowLeftIcon} from '../icons/arrow-left';
import {Plus as PlusIcon} from '../icons/plus';
import {Trash as TrashIcon} from '../icons/trash';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";
import {customerApi} from "../api/customer";
import {productApi} from "../api/product";
import {AutocompleteField} from "../components/autocomplete-field";
import {ResourceLoading} from "../components/resource-loading";
import {ResourceError} from "../components/resource-error";
import {currency} from "../config";
import {orderApi} from "../api/order";

const courierOptions = [
    {
        label: 'Nova Poshta',
        value: 'Nova Poshta',
    },
    {
        label: 'Meest Express',
        value: 'Meest Express'
    }
];

export const OrderCreate = () => {
    const [customersState, setCustomersState] = useState({isLoading: true});
    const [productsState, setProductsState] = useState({isLoading: true});
    const requestMethod = useHttp();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const getCustomers = () => customerApi.getCustomers({});
    const getProducts = () => productApi.getProducts({});

    useEffect(() => {
        requestMethod(getCustomers, setCustomersState).catch(console.error);
        requestMethod(getProducts, setProductsState).catch(console.error);
    }, []);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            customer: {
                id: '',
                fullName: '',
            },
            phone: '',
            courierName: 'Nova Poshta',
            courierBranchNumber: '',
            deliveryAddress: '',
            prepayment: 0,
            items: [
                {
                    id: '',
                    name: '',
                    price: '',
                    quantity: 1,
                    discountAmount: 0
                }
            ],
            note: '',
            submit: null
        },
        validationSchema: Yup.object().shape({
            customer: Yup.object().shape({
                fullName: Yup.string().max(255).required('Customer Full Name is required'),
            }),
            deliveryAddress: Yup.string().max(255).required('Delivery Address is required'),
            courierName: Yup.string().max(255).oneOf(courierOptions.map((option) => option.value)).required('Courier is required'),
            courierBranchNumber: Yup.string().max(5).required("Branch number is required"),
            phone: Yup.string().phone("UA", true).required("Phone is required"),
            items: Yup.array().of(Yup.object().shape({
                name: Yup.string().max(255).required('Name of product is required'),
                quantity: Yup.number().min(1).required('Quantity is required'),
            })),
            note: Yup.string().max(1024),
            prepayment: Yup.number()
                .typeError('Must be a number')
                .min(0, 'Value cannot be less then ${min}')
                .integer('Only integers are allowed')
        }),
        onSubmit: async (values, helpers) => {
            try {
                console.log(values)

                const payload =
                    {
                        customerId: values.customer.id,
                        address: values.deliveryAddress,
                        courier: values.courierName,
                        branchNumber: values.courierBranchNumber,
                        prepaymentAmount: values.prepayment,
                        items: values.items.map(item => {
                            return {
                                productId: item.id,
                                quantity: item.quantity,
                                discountAmount: item.discountAmount
                            }
                        })
                    }

                await orderApi.createOrder(payload);
                toast.success('Invoice created');
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                navigate("/dashboard/orders");
            } catch (err) {
                console.error(err);
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

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

    const totalPriceTmp = formik.values.items.reduce((acc, item) => acc
        + (Number.parseFloat(item.price) * item.quantity), 0);

    const totalPriceMinusPrepayment = (totalPriceTmp - formik.values.prepayment);

    const getItemError = (index, property) => formik?.touched?.items
        && formik?.errors?.items
        && formik?.touched?.items[index]?.[property]
        && formik?.errors?.items[index]?.[property];

    const customers = customersState.data?.customers.map(customer => {
        return {
            id: customer.id,
            label: customer.fullName,
            phone: customer.phone
        }
    });

    const products = productsState.data?.products.map(product => {
        return {
            id: product.id,
            label: product.name,
            price: product.price
        }
    })

    const renderContent = () => {
        if (productsState.isLoading || customersState.isLoading) {
            return <ResourceLoading/>;
        }

        if (productsState.error || customersState.error) {
            return <ResourceError/>;
        }

        return (
            <Card variant="outlined">
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <AutocompleteField
                                    error={Boolean(formik.touched.customer && formik.errors.customer)}
                                    fullWidth
                                    filterSelectedOptions
                                    helperText={formik.touched.customer && t(formik.errors.customer)}
                                    label={t("Customer")}
                                    name="customer"
                                    onBlur={formik.handleBlur}
                                    onChange={(event, value) => {
                                        if (value) {
                                            formik.setFieldValue('customer', {
                                                id: value.id,
                                                fullName: value.label
                                            });
                                            formik.setFieldValue('phone', value.phone)
                                        }
                                    }}
                                    value={formik.values.customer.label}
                                    options={customers}
                                    placeholder={t("Full Name")}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <InputField
                                    error={Boolean(formik.touched.deliveryAddress && formik.errors.deliveryAddress)}
                                    fullWidth
                                    helperText={formik.touched.deliveryAddress && t(formik.errors.deliveryAddress)}
                                    label={t("Delivery Address")}
                                    name="deliveryAddress"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    placeholder={t("City/Village, District, Region")}
                                    value={formik.values.address}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <InputField
                                    error={Boolean(formik.touched.courierName && formik.errors.courierName)}
                                    fullWidth
                                    helperText={formik.touched.courierName && formik.errors.courierName}
                                    label={t("Courier")}
                                    name="courierName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    select
                                    value={formik.values.courierName}
                                >
                                    {courierOptions.map((courier) => (
                                        <MenuItem
                                            key={courier.value}
                                            value={courier.value}
                                        >
                                            {t(courier.label)}
                                        </MenuItem>
                                    ))}
                                </InputField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <InputField
                                    error={Boolean(formik.touched.courierBranchNumber && formik.errors.courierBranchNumber)}
                                    fullWidth
                                    helperText={formik.touched.courierBranchNumber && t(formik.errors.courierBranchNumber)}
                                    label={t("Branch Number")}
                                    name="courierBranchNumber"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    placeholder="#"
                                    value={formik.values.courierBranchNumber}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <InputField
                                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                                    fullWidth
                                    helperText={formik.touched.phone && t(formik.errors.phone)}
                                    label={t("Phone")}
                                    name="phone"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    placeholder="0981111111"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <InputField
                                    error={Boolean(formik.touched.prepayment && formik.errors.prepayment)}
                                    fullWidth
                                    helperText={formik.touched.prepayment && t(formik.errors.prepayment)}
                                    label={t("Prepayment")}
                                    name="prepayment"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.prepayment}
                                />
                            </Grid>
                            {formik.values.items.map((item, index) => {
                                const totalPrice = Number.parseFloat(item.price) * item.quantity;

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
                                                    console.log(value);
                                                    if (value === null || value === undefined) {
                                                        return true;
                                                    } else {
                                                        return option.label === value;
                                                    }
                                                }}
                                                placeholder={t("Item Name")}
                                                options={products}
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
                                    {`${currency.symbol}${numeral(totalPriceMinusPrepayment).format('0,0.00')}`}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <Divider/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <InputField
                                    error={Boolean(formik.touched.note && formik.errors.note)}
                                    fullWidth
                                    helperText={formik.touched.note && formik.errors.note}
                                    label={t("Additional Notes")}
                                    multiline
                                    name="note"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    value={formik.values.note}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            {t("Create Order")}
                        </Button>
                    </CardActions>
                </form>
            </Card>
        );
    };

    return (
        <>
            <Helmet>
                <title>Invoice: Create</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{py: 4}}>
                        <Box sx={{mb: 2}}>
                            <Button
                                color="primary"
                                component={RouterLink}
                                startIcon={<ArrowLeftIcon/>}
                                to="/dashboard/orders"
                                variant="text"
                            >
                                {t("Order")}
                            </Button>
                        </Box>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {t("Create Order")}
                        </Typography>
                    </Box>
                    {renderContent()}
                </Container>
            </Box>
        </>
    );
};
