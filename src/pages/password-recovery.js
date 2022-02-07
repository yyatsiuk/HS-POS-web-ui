import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Card, CardContent, Container, FormHelperText, Grid, Typography} from '@material-ui/core';
import {InputField} from '../components/input-field';
import {useAuth} from '../hooks/use-auth';
import {useMounted} from '../hooks/use-mounted';
import gtm from '../lib/gtm';

export const PasswordRecovery = () => {
    const mounted = useMounted();
    const {passwordRecovery} = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            submit: null
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        }),
        onSubmit: async (values, {setErrors, setStatus, setSubmitting}) => {
            try {
                await passwordRecovery?.(values.email);

                navigate('/password-reset', {
                    state: {
                        username: values.email
                    }
                });
            } catch (err) {
                console.error(err);
                if (mounted.current) {
                    setStatus({success: false});
                    setErrors({submit: err.message});
                    setSubmitting(false);
                }
            }
        }
    });

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    return (
        <>
            <Helmet>
                <title>Password Recovery | HS-POS</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    pt: '64px'
                }}
            >
                <Box sx={{py: 9}}>
                    <Container maxWidth="sm">
                        <Grid
                            container
                        >
                            <Grid
                                item
                            >
                                <Card
                                    sx={{backgroundColor: 'background.default'}}
                                    elevation={10}
                                >
                                    <CardContent>
                                        <form onSubmit={formik.handleSubmit}>
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
                                                        variant="h4"
                                                    >
                                                        Forgot password
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                >
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="body1"
                                                    >
                                                        Enter the email address you used when you
                                                        joined and we’ll send you instructions to reset your password.
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                >
                                                    <InputField
                                                        autoFocus
                                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                                        fullWidth
                                                        helperText={formik.touched.email && formik.errors.email}
                                                        label="Email Address"
                                                        name="email"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="email"
                                                        value={formik.values.email}
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
                                                        Send Verification Email
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
};
