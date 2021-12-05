import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid} from '@material-ui/core';
import {useTranslation} from "react-i18next";
import {AutocompleteField} from "../autocomplete-field";

export const OrderCreateDialog = (props) => {
    const {open, onClose, customers, products, ...other} = props;
    const navigate = useNavigate();
    const {t} = useTranslation();

    const formik = useFormik({
        initialValues: {
            products: products || [],
            customerFullName: '',
            customerId: '',
            submit: 'null'
        },
        validationSchema: Yup.object().shape({
            products: Yup.array().min(1).required("Products is required"),
            customerFullName: Yup.string().max(255).required('Customer full name is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                helpers.resetForm();
                console.log(values);
                navigate('/dashboard/orders/1');
            } catch (err) {
                console.error(err);
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <Dialog
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    width: '100%'
                }
            }}
            TransitionProps={{
                onExited: () => formik.resetForm()
            }}
            {...other}
        >
            <DialogTitle>
                {t("Create Order")}
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <AutocompleteField
                            error={Boolean(formik.touched.customerFullName && formik.errors.customerFullName)}
                            filterSelectedOptions
                            fullWidth
                            helperText={formik.touched.customerFullName && formik.errors.customerFullName}
                            label={t("Customer")}
                            name="customerFullName"
                            onChange={(event, value) => {
                                if (value) {
                                    formik.setFieldValue('customerFullName', value.label);
                                    formik.setFieldValue('customerId', value.id);
                                }
                            }}
                            value={formik.values.customerFullName}
                            options={customers}
                            isOptionEqualToValue={(option, value) => option.label === value}
                            sx={{mb: 2}}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <AutocompleteField
                            error={Boolean(formik.touched.products && formik.errors.products)}
                            fullWidth
                            multiple
                            filterSelectedOptions
                            helperText={formik.touched.products && formik.errors.products}
                            label={t("Products")}
                            name="products"
                            onBlur={formik.handleBlur}
                            onChange={(event, value) => {
                                if (value) {
                                    formik.setFieldValue('products', value);
                                }
                            }}
                            value={formik.values.products.label}
                            options={products}
                            isOptionEqualToValue={(option, value) => option.label === value}
                        />
                    </Grid>
                    {formik.errors.submit && (
                        <Grid
                            item
                            xs={12}
                        >
                            <FormHelperText error>
                                {formik.errors.submit}
                            </FormHelperText>
                        </Grid>
                    )}
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
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    variant="contained"
                    disabled={formik.isSubmitting}
                >
                    {t("Create Order")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

OrderCreateDialog.defaultProps = {
    open: false
};

OrderCreateDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
