import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Grid} from '@material-ui/core';
import {productApi} from '../api/product';
import {ProductInfo} from '../components/product/product-info';
import {ProductInfoDialog} from '../components/product/product-info-dialog';
import {ResourceError} from '../components/resource-error';
import {ResourceLoading} from '../components/resource-loading';
import gtm from '../lib/gtm';
import useHttp from "../hooks/use-http";

export const ProductSummary = () => {
    const [productState, setProductState] = useState({isLoading: true});
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const httpRequest = useHttp();
    const getProduct = () => productApi.getProduct();

    useEffect(() => {
        httpRequest(getProduct, setProductState).catch(console.error);
    }, []);

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    const renderContent = () => {
        if (productState.isLoading) {
            return <ResourceLoading/>;
        }

        if (productState.error) {
            return <ResourceError/>;
        }

        return (
            <>
                <Grid
                    container
                    item
                    lg={12}
                    sx={{
                        height: 'fit-content',
                        order: {
                            md: 2,
                            xs: 1
                        }
                    }}
                >
                    <Grid
                        item
                        md={12}
                    >
                        <ProductInfo
                            onEdit={() => setOpenInfoDialog(true)}
                            product={productState.data}
                        />
                    </Grid>
                </Grid>
                <ProductInfoDialog
                    onClose={() => setOpenInfoDialog(false)}
                    open={openInfoDialog}
                    product={productState.data}
                />
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>Product: Summary | HS-POS Dashboard</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1
                }}
            >
                {renderContent()}
            </Box>
        </>
    );
};
