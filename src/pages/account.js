import {Link as RouterLink, Outlet, useLocation} from 'react-router-dom';
import {Box, Container, Divider, Tab, Tabs, Typography} from '@material-ui/core';
import {useTranslation} from "react-i18next";

const tabs = [
    {
        href: '/dashboard/account',
        label: 'General'
    }
];

export const Account = () => {
    const location = useLocation();
    const {t} = useTranslation();

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
                <Box sx={{py: 4}}>
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
                            {t("Account Settings")}
                        </Typography>
                    </Box>
                    <Tabs
                        allowScrollButtonsMobile
                        sx={{mt: 2}}
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
            </Container>
        </Box>
    );
};
