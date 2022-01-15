import {useCallback, useEffect, useState} from 'react';
import {Link as RouterLink, Outlet, useLocation, useParams} from 'react-router-dom';
import {Box, Button, Container, Divider, Grid, Skeleton, Tab, Tabs, Typography} from '@material-ui/core';
import {customerApi} from '../api/customer';
import {useMounted} from '../hooks/use-mounted';
import {ArrowLeft as ArrowLeftIcon} from '../icons/arrow-left';
import {Calendar as CalendarIcon} from '../icons/calendar';
import {Cash as CashIcon} from '../icons/cash';
import {ExclamationOutlined as ExclamationOutlinedIcon} from '../icons/exclamation-outlined';
import {ShoppingCart as ShoppingCartIcon} from '../icons/shopping-cart';
import {useTranslation} from "react-i18next";

// NOTE: This should be generated based on user data
const stats = [
    {
        content: 'Зереєстрований з: Apr 2021',
        icon: (
            <CalendarIcon
                fontSize="small"
                sx={{color: 'text.secondary'}}
            />
        )
    },
    {
        content: 'К-сть замовлень: 17',
        icon: (
            <ShoppingCartIcon
                fontSize="small"
                sx={{color: 'text.secondary'}}
            />
        )
    },
    {
        content: 'Витрачено: $69.00',
        icon: (
            <CashIcon
                fontSize="small"
                sx={{color: 'text.secondary'}}
            />
        )
    }
];

// NOTE: This should be generated based on user data because "/1" represents "/:id" from routing
//  strategy where ":id" is dynamic depending on current customer id
const tabs = [
    {
        href: '/dashboard/customers/1',
        label: 'Summary'
    },
    {
        href: '/dashboard/customers/1/orders',
        label: 'Orders'
    }
];

export const Customer = () => {
    const mounted = useMounted();
    const location = useLocation();
    const {customerId} = useParams()
    const [customerState, setCustomerState] = useState({isLoading: true});
    const {t} = useTranslation();

    const getCustomer = useCallback(async () => {
        setCustomerState(() => ({isLoading: true}));

        try {
            const result = await customerApi.getCustomer(customerId);
            console.log(result);

            if (mounted.current) {
                setCustomerState(() => ({
                    isLoading: false,
                    data: result
                }));
            }
        } catch (err) {
            console.error(err);

            if (mounted.current) {
                setCustomerState(() => ({
                    isLoading: false,
                    error: err.message
                }));
            }
        }
    }, []);

    useEffect(() => {
        getCustomer().catch(console.error);
    }, []);

    const renderContent = () => {
        if (customerState.isLoading) {
            return (
                <Box sx={{py: 4}}>
                    <Skeleton height={42}/>
                    <Skeleton/>
                    <Skeleton/>
                </Box>
            );
        }

        if (customerState.error) {
            return (
                <Box sx={{py: 4}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'background.default',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 3
                        }}
                    >
                        <ExclamationOutlinedIcon/>
                        <Typography
                            color="textSecondary"
                            sx={{mt: 2}}
                            variant="body2"
                        >
                            {customerState.error}
                        </Typography>
                    </Box>
                </Box>
            );
        }

        return (
            <>
                <Box sx={{py: 4}}>
                    <Box sx={{mb: 2}}>
                        <Button
                            color="primary"
                            component={RouterLink}
                            startIcon={<ArrowLeftIcon/>}
                            to="/dashboard/customers"
                            variant="text"
                        >
                            {t("Customers")}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {customerState.data.fullName}
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                    </Box>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mt: 2
                        }}
                        wrap="wrap"
                    >
                        {stats.map(({content, icon}) => (
                            <Grid
                                item
                                key={content}
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    width: {
                                        md: 'auto',
                                        xs: '100%'
                                    }
                                }}
                            >
                                {icon}
                                <Typography
                                    color="textSecondary"
                                    sx={{ml: 0.5}}
                                    variant="body2"
                                >
                                    {content}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Tabs
                        allowScrollButtonsMobile
                        sx={{mt: 4}}
                        value={tabs.findIndex((tab) => tab.href === location.pathname)}
                        variant="scrollable"
                    >
                        {tabs.map((option) => (
                            <Tab
                                component={RouterLink}
                                key={option.href}
                                label={t(option.label)}
                                to={option.href}
                            />
                        ))}
                    </Tabs>
                    <Divider/>
                </Box>
                <Outlet/>
            </>
        );
    };

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                flexGrow: 1
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                {renderContent()}
            </Container>
        </Box>
    );
};
