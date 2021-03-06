import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
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
import {useTranslation} from "react-i18next";
import {currency} from "../../config";
import {Trash as TrashIcon} from "../../icons/trash";
import {ImageDropzone} from "../image-dropzone";
import {imageApi} from "../../api/imge";
import {productApi} from "../../api/product";

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

const IMAGE_TYPE = "PRODUCT";

export const ProductInfoDialog = (props) => {
    const {open, onClose, product, categories, onUpdate} = props;
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            imageUrl: product?.imageUrl || '',
            image: '',
            id: product?.id || '',
            code: product?.code || '',
            name: product?.name || '',
            price: product?.price || '',
            description: product?.description || '',
            status: product?.status || '',
            category: product?.category || '',
            createdAt: product?.createdAt || '',
            submit: "null"
        },
        validationSchema: Yup.object().shape({
            imageUrl: Yup.string(),
            id: Yup.string().required("Id is required"),
            name: Yup.string().max(255).required('Name is required'),
            description: Yup.string().max(500),
            price: Yup.number().min(0).required("Price is required"),
            category: Yup.string().required("Category is required"),
            status: Yup.string().required("Status is required")
        }),
        onSubmit: async (values, helpers) => {
            try {
                console.log(values);
                let imageUrl = values.imageUrl;
                if (values.image) {
                    imageUrl = await imageApi.uploadImage(values.image, IMAGE_TYPE)
                }

                const payload = {
                    name: values.name,
                    code: values.code,
                    imageUrl: imageUrl,
                    description: values.description,
                    price: values.price,
                    category: values.category,
                    createdAt: values.createdAt,
                    status: values.status
                }
                const productUpdated = await productApi.updateProduct(payload, values.id);

                onUpdate({data: productUpdated});
                toast.success('Product updated');
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
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
                {t("Edit Product")}
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
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            disabled
                            error={Boolean(formik.touched.code && formik.errors.code)}
                            fullWidth
                            helperText={formik.touched.code && formik.errors.code}
                            label={t("Code")}
                            name="code"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.code}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
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
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            helperText={formik.touched.description && formik.errors.description}
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
                            error={Boolean(formik.touched.status && formik.errors.status)}
                            fullWidth
                            helperText={formik.touched.status && formik.errors.status}
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
                >
                    {t("Save Changes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProductInfoDialog.defaultProps = {
    open: false
};

ProductInfoDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    product: PropTypes.object
};
