import {useCallback, useEffect, useState} from 'react';
import {Link as RouterLink, Outlet, useLocation, useParams} from 'react-router-dom';
import {Box, Button, Container, Divider, Skeleton, Tab, Tabs, Typography} from '@material-ui/core';
import {productApi} from '../api/product';
import {ArrowLeft as ArrowLeftIcon} from '../icons/arrow-left';
import {ExclamationOutlined as ExclamationOutlinedIcon} from '../icons/exclamation-outlined';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";
import {ProductSummary} from "./product-summary";
import gtm from "../lib/gtm";

// NOTE: This should be generated based on product data because "/1" represents "/:id" from routing
// //  strategy where ":id" is dynamic depending on current product id
const tabs = [
    {
        href: '/dashboard/products/{id}',
        label: 'Summary'
    }
];

export const Product = () => {
    const {productId} = useParams();
    const location = useLocation();
    const [productState, setProductState] = useState({isLoading: true});
    const [categoriesState, setCategoriesState] = useState({isLoading: true});
    const {t} = useTranslation();
    const requestMethod = useHttp();

    const getProductById = () => productApi.getProduct(productId === ":id" ? null : productId);
    const getCategories = () => productApi.getAllCategories();

    const getProduct = useCallback(async () => {
        requestMethod(getProductById, setProductState).catch(console.error);
        requestMethod(getCategories, setCategoriesState).catch(console.error);
    }, []);

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    useEffect(() => {
        getProduct().catch(console.error);
    }, []);

    const renderContent = () => {
        if (productState.isLoading) {
            return (
                <Box sx={{py: 4}}>
                    <Skeleton height={42}/>
                    <Skeleton/>
                    <Skeleton/>
                </Box>
            );
        }

        if (productState.error) {
            return (
                <Box sx={{py: 4}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'neutral.100',
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
                            {productState.error}
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
                            to="/dashboard/products"
                            variant="text"
                        >
                            {t("Products")}
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
                            {productState.data.name}
                        </Typography>
                    </Box>
                    <Tabs
                        allowScrollButtonsMobile
                        sx={{mt: 4}}
                        value={tabs.findIndex((tab) => tab.href.replace("{id}", productId) === location.pathname)}
                        variant="scrollable"
                    >
                        {tabs.map((option) => (
                            <Tab
                                component={RouterLink}
                                key={option.href}
                                label={t(option.label)}
                                to={option.href.replace("{id}", productId)}
                            />
                        ))}
                    </Tabs>
                    <Divider/>
                </Box>
                <Outlet/>
                <ProductSummary
                    product={productState.data}
                    categories={categoriesState.data || []}
                    onProductUpdate={setProductState}
                    isLoading={productState.isLoading}
                    error={productState.error}
                />
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
