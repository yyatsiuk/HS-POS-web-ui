import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import toast from 'react-hot-toast';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid} from '@material-ui/core';
import {InputField} from '../input-field';
import {useTranslation} from "react-i18next";
import {customerApi} from "../../api/customer";

export const CustomerDialog = (props) => {
    const {customer, open, onClose, onUpdate, ...other} = props;
    const {t} = useTranslation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: customer?.id || null,
            address: customer?.address || '',
            instagram: customer?.instagram || '',
            fullName: customer?.fullName || '',
            phone: customer?.phone || '',
            submit: null
        },
        validationSchema: Yup.object().shape({
            address: Yup.string().max(255),
            instagram: Yup.string().max(255).required('Instagram is required'),
            fullName: Yup.string().max(255).required('Full name is required'),
            phone: Yup.string().phone("UA", true).required("Phone is required")
        }),
        onSubmit: async (values, helpers) => {
            try {
                if (customer) {
                    console.log(customer);
                    const updatedCustomer = await customerApi.updateCustomer({
                        createdAt: customer.createdAt,
                        address: values.address,
                        fullName: values.fullName,
                        instagram: values.instagram,
                        phone: values.phone
                    }, values.id);

                    onUpdate({data: updatedCustomer});
                } else {
                    await customerApi.crateCustomer({
                        address: values.address,
                        fullName: values.fullName,
                        instagram: values.instagram,
                        phone: values.phone
                    });
                }

                toast.success(`Customer ${customer ? 'updated' : 'created'}`);
                helpers.resetForm();
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                onClose();
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
            TransitionProps={{
                onExited: () => formik.resetForm()
            }}
            {...other}
        >
            <DialogTitle>
                {customer ? t('Update Customer') : t('Create Customer')}
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
                        <InputField
                            error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                            fullWidth
                            helperText={formik.touched.fullName && t(formik.errors.fullName)}
                            label={t("Full Name")}
                            name="fullName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            required
                            value={formik.values.fullName}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.instagram && formik.errors.instagram)}
                            fullWidth
                            helperText={formik.touched.instagram && t(formik.errors.instagram)}
                            label={t("Instagram")}
                            name="instagram"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            required
                            type="instagram"
                            value={formik.values.instagram}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
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
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.address && formik.errors.address)}
                            fullWidth
                            helperText={formik.touched.address && t(formik.errors.address)}
                            label={t("Address")}
                            name="address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.address}
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
                    variant="outlined"
                >
                    {t("Cancel")}
                </Button>
                <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    variant="contained"
                >
                    {customer ? t('Update') : t('Create')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CustomerDialog.defaultProps = {
    open: false
};

CustomerDialog.propTypes = {
    customer: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func
};
