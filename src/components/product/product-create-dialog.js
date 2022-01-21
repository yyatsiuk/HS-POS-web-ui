import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {currency} from '../../config';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Typography
} from '@material-ui/core';
import {InputField} from '../input-field';
import {Trash as TrashIcon} from "../../icons/trash";
import {ImageDropzone} from "../image-dropzone";
import {useTranslation} from "react-i18next";
import {imageApi} from "../../api/imge";
import {productApi} from "../../api/product";

const IMAGE_TYPE = "PRODUCT";
const statusOptions = [
    {
        label: "In Stock",
        value: "IN_STOCK"
    },
    {
        label: "Out of Stock",
        value: "OUT_OF_STOCK"
    }
]

export const ProductCreateDialog = (props) => {
    const {open, onClose, categories, ...other} = props;
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            description: '',
            category: '',
            name: '',
            imageUrl: '',
            image: null,
            price: 0,
            status: '',
            submit: 'null'
        },
        validationSchema: Yup.object().shape({
            description: Yup.string().max(500),
            name: Yup.string().max(255).required('Name is required'),
            category: Yup.string().required("Category is required"),
            price: Yup.number().min(0).required("Price is required"),
            imageUrl: Yup.string(),
            status: Yup.string().required("Status is required")
        }),
        onSubmit: async (values, helpers) => {
            try {
                console.log(values);
                const imageUrl = await imageApi.uploadImage(values.image, IMAGE_TYPE);
                await productApi.createProduct({
                    name: values.name,
                    imageUrl: imageUrl,
                    description: values.description,
                    price: values.price,
                    category: values.category,
                    status: values.status
                });

                toast.success('Product created');
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                helpers.resetForm();
                onClose?.();
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
                {t("Create Product")}
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
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && t(formik.errors.name)}
                            label={t("Product name")}
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.category && formik.errors.category)}
                            fullWidth
                            helperText={formik.touched.category && t(formik.errors.category)}
                            label={t("Category")}
                            name="category"
                            select
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.category}
                        >
                            {categories.map((prodCategory) => (
                                <MenuItem
                                    key={prodCategory}
                                    value={prodCategory}
                                >
                                    {t(prodCategory)}
                                </MenuItem>
                            ))}
                        </InputField>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.status && formik.errors.status)}
                            fullWidth
                            helperText={formik.touched.status && t(formik.errors.status)}
                            label={t("Status")}
                            name="status"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            select
                            value={formik.values.status}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {t(option.label)}
                                </MenuItem>
                            ))}
                        </InputField>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            helperText={formik.touched.description && t(formik.errors.description)}
                            label={t("Description")}
                            multiline
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={4}
                            value={formik.values.description}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.price && formik.errors.price)}
                            helperText={formik.touched.price && t(formik.errors.price)}
                            label={t("Price")}
                            name="price"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="number"
                            sx={{maxWidth: 236}}
                            value={formik.values.price}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {currency.symbol}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            color="textPrimary"
                            sx={{mb: 1.25}}
                            variant="subtitle2"
                        >
                            {t("Image")}
                        </Typography>
                        {formik.values.imageUrl
                            ? (
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
                                        },
                                        '&:hover': {
                                            boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
                                            '& > button': {
                                                display: 'block'
                                            },
                                            '& img': {
                                                opacity: 0.3
                                            }
                                        }
                                    }}
                                >
                                    <img
                                        alt={formik.values.name}
                                        src={formik.values.imageUrl}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => formik.setFieldValue('imageUrl', '')}
                                        sx={{
                                            display: 'none',
                                            left: 0,
                                            position: 'absolute',
                                            top: 0
                                        }}
                                    >
                                        <TrashIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            ) : (
                                <ImageDropzone
                                    onDrop={(files) => {
                                        formik.setFieldValue('imageUrl', URL.createObjectURL(files[0]));
                                        formik.setFieldValue('image', files[0]);
                                    }}
                                    sx={{
                                        minHeight: 126,
                                        maxWidth: 126
                                    }}
                                />
                            )}
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
                    disabled={formik.isSubmitting}
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    variant="contained"
                >
                    {t("Create Product")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProductCreateDialog.defaultProps = {
    open: false
};

ProductCreateDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
