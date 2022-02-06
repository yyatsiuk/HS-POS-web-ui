import {Link as BrowserLink} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, FormHelperText, Grid, Typography} from '@material-ui/core';
import {InputField} from '../input-field';
import {useAuth} from '../../hooks/use-auth';
import {useMounted} from '../../hooks/use-mounted';
import {useTranslation} from "react-i18next";

export const LoginJwt = () => {
    const mounted = useMounted();
    const {login} = useAuth();
    const {t} = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
            policy: Yup.boolean()
        }),
        onSubmit: async (values, helpers) => {
            try {
                await login(values.email, values.password);

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
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mb: 3
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {t("Login")}
                </Typography>
                <Box sx={{flexGrow: 1}}/>
                <Button
                    color="primary"
                    component={BrowserLink}
                    to="/register"
                    variant="text"
                >
                    {t("Sign Up")}
                </Button>
            </Box>
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
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && t(formik.errors.email)}
                        label={t("Email address")}
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
                {formik.errors.submit && (
                    <Grid
                        item
                        xs={12}
                    >
                        <FormHelperText error>
                            {t(formik.errors.submit)}
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
                        {t("Log In")}
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        color="primary"
                        component={BrowserLink}
                        to="/password-recovery"
                        variant="text"
                    >
                        {t("Forgot password")}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
