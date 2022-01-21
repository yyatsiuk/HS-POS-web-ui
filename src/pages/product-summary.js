import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Grid} from '@material-ui/core';
import {ProductInfo} from '../components/product/product-info';
import {ProductInfoDialog} from '../components/product/product-info-dialog';
import {ResourceError} from '../components/resource-error';
import {ResourceLoading} from '../components/resource-loading';

export const ProductSummary = ({isLoading, error, product, categories, onProductUpdate}) => {
    const [openInfoDialog, setOpenInfoDialog] = useState(false);

    const renderContent = () => {
        if (isLoading) {
            return <ResourceLoading/>;
        }

        if (error) {
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
                            product={product}
                        />
                    </Grid>
                </Grid>
                <ProductInfoDialog
                    onClose={() => setOpenInfoDialog(false)}
                    open={openInfoDialog}
                    product={product}
                    categories={categories}
                    onUpdate={onProductUpdate}
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
