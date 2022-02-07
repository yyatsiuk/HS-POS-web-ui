import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Card, CardContent, Container, Grid} from '@material-ui/core';
import {RegisterJwt} from '../components/auth/register-jwt';
import gtm from '../lib/gtm';

export const Register = () => {
    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    return (
        <>
            <Helmet>
                <title>Register | HS-POS Dashboard</title>
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
                            spacing={6}
                        >
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <Card
                                    sx={{backgroundColor: 'background.default'}}
                                    elevation={10}
                                >
                                    <CardContent>
                                        <RegisterJwt/>
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
