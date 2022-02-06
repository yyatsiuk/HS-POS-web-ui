import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {AppBar, Box, Card, CardContent, Container, Grid, Toolbar} from '@material-ui/core';
import {LoginJwt} from '../components/auth/login-jwt';
import {useAuth} from '../hooks/use-auth';
import gtm from '../lib/gtm';

export const Login = () => {
    const {method} = useAuth();

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
                    <Container maxWidth="sm" sx={{
                        "margin-top": 50
                    }}>
                        <Grid container>
                            <Grid item>
                                <Card
                                    sx={{backgroundColor: 'background.default'}}
                                    elevation={10}
                                >
                                    <CardContent>
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
