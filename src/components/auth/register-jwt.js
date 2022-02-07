import {Link as RouterLink} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, FormHelperText, Grid, Link, Typography} from '@material-ui/core';
import {InputField} from '../input-field';
import {useAuth} from '../../hooks/use-auth';
import {useMounted} from '../../hooks/use-mounted';
import {useTranslation} from "react-i18next";

export const RegisterJwt = () => {
    const mounted = useMounted();
    const {register} = useAuth();
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
            passwordConfirm: '',
            submit: null
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            fullName: Yup.string().max(255).required('Full name is required'),
            password: Yup.string().max(255).required('Password is required'),
            passwordConfirm: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Password confirm is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await register(values.email, values.fullName, values.password);

                if (mounted.current) {
                    helpers.setStatus({success: true});
                    helpers.setSubmitting(false);
                }
            } catch (err) {
                console.error(err);
                if (mounted.current) {
                    helpers.setStatus({success: false});
                    helpers.setErrors({submit: err.message});
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography
                color="textPrimary"
                sx={{mb: 3}}
                variant="h4"
            >
                {t("Register")}
            </Typography>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                >
                    <InputField
                        autoFocus
                        error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                        fullWidth
                        helperText={formik.touched.fullName && t(formik.errors.fullName)}
                        label={t("Full Name")}
                        name="fullName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && t(formik.errors.email)}
                        label={t("Email Address")}
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && t(formik.errors.password)}
                        label={t("Password")}
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputField
                        error={Boolean(formik.touched.passwordConfirm
                            && formik.errors.passwordConfirm)}
                        fullWidth
                        helperText={formik.touched.passwordConfirm && t(formik.errors.passwordConfirm)}
                        label={t("Re-type Password")}
                        name="passwordConfirm"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.passwordConfirm}
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
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        color="primary"
                        disabled={formik.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        {t("Sign Up")}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
