import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Box, Card, CardContent, Container, Grid, Toolbar} from '@material-ui/core';
import {LoginAmplify} from '../components/auth/login-amplify';
import {LoginAuth0} from '../components/auth/login-auth0';
import {LoginFirebase} from '../components/auth/login-firebase';
import {LoginJwt} from '../components/auth/login-jwt';
import {Logo} from '../components/logo';
import {useSettings} from '../contexts/settings-context';
import {useAuth} from '../hooks/use-auth';
import gtm from '../lib/gtm';

export const Login = () => {
    const {method} = useAuth();
    const {settings} = useSettings();

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    return (
        <>
            <Helmet>
                <title>Login | HEIDA Dashboard</title>
            </Helmet>
            <AppBar
                elevation={0}
                sx={{backgroundColor: 'background.paper'}}
            >
                <Container maxWidth="md">
                    <Toolbar
                        disableGutters
                        sx={{height: 64}}
                    >
                        <RouterLink to="/">
                            <Logo variant={settings.theme === 'dark' ? 'light' : 'dark'}/>
                        </RouterLink>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    pt: '64px'
                }}
            >
                <Box>
                    <Container maxWidth="sm">
                        <Grid container>
                            <Grid item>
                                <Card
                                    sx={{backgroundColor: 'background.default'}}
                                    elevation={10}
                                >
                                    <CardContent>
                                        {method === 'Amplify' && <LoginAmplify/>}
                                        {method === 'Auth0' && <LoginAuth0/>}
                                        {method === 'Firebase' && <LoginFirebase/>}
                                        {method === 'JWT' && <LoginJwt/>}
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
