import {useCallback, useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import toast from 'react-hot-toast';
import {Box, Button, Container, Grid, Skeleton, Typography} from '@material-ui/core';
import {orderApi} from '../api/order';
import {ActionsMenu} from '../components/actions-menu';
import {OrderInfo} from '../components/order/order-info';
import {OrderInfoDialog} from '../components/order/order-info-dialog';
import {OrderLineItems} from '../components/order/order-line-items';
import {OrderStatus} from '../components/order/order-status';
import {ArrowLeft as ArrowLeftIcon} from '../icons/arrow-left';
import {ExclamationOutlined as ExclamationOutlinedIcon} from '../icons/exclamation-outlined';
import gtm from '../lib/gtm';
import {useTranslation} from "react-i18next";
import useHttp from "../hooks/use-http";
import {OrderItemsDialog} from "../components/order/order-items-dialog";
import {productApi} from "../api/product";

export const Order = () => {
    const {orderId} = useParams();
    const [orderState, setOrderState] = useState({isLoading: true});
    const [productsState, setProductsState] = useState({isLoading: true});
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const [openItemsDialog, setOpenItemsDialog] = useState(false);
    const requestMethod = useHttp();
    const {t} = useTranslation();

    const getOrderById = () => orderApi.getOrderById(orderId);
    const getProducts = () => productApi.getProducts({});

    const getOrder = useCallback(async () => {
        requestMethod(getOrderById, setOrderState).catch(console.error);
        requestMethod(getProducts, setProductsState).catch(console.error);
    }, []);

    useEffect(() => {
        getOrder().catch(console.error);
    }, []);

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    const handleMarkAsDuplicate = () => {
        toast.error('This action is not available on demo');
    };

    const handleCancel = () => {
        toast.error('This action is not available on demo');
    };

    const handleDelete = () => {
        toast.error('This action is not available on demo');
    };

    const handleMarkAsPaid = () => {
        setOrderState(prevState => {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    paymentStatus: "PAID"
                }
            }
        });
    }


    const actions = [
        {
            label: 'Mark as Duplicate',
            onClick: handleMarkAsDuplicate
        },
        {
            label: 'Cancel Order',
            onClick: handleCancel
        },
        {
            label: 'Delete Order',
            onClick: handleDelete
        }
    ];

    const renderContent = () => {
        if (orderState.isLoading || productsState.isLoading) {
            return (
                <Box sx={{py: 4}}>
                    <Skeleton height={42}/>
                    <Skeleton/>
                    <Skeleton/>
                </Box>
            );
        }

        if (orderState.error) {
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
                            {orderState.error}
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
                            to="/dashboard/orders"
                            variant="text"
                        >
                            {t("Orders")}
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
                            {`#${orderState.data.id}`}
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <ActionsMenu actions={actions}/>
                    </Box>
                </Box>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        container
                        item
                        lg={8}
                        spacing={3}
                        sx={{height: 'fit-content'}}
                        xs={12}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <OrderInfo
                                onEdit={() => setOpenInfoDialog(true)}
                                order={orderState.data}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <OrderLineItems
                                onEdit={() => setOpenItemsDialog(true)}
                                order={orderState.data}/>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        lg={4}
                        spacing={3}
                        sx={{height: 'fit-content'}}
                        xs={12}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <OrderStatus order={orderState.data} onMarkAsPaid={handleMarkAsPaid}/>
                        </Grid>
                    </Grid>
                </Grid>
                <OrderInfoDialog
                    onClose={() => setOpenInfoDialog(false)}
                    open={openInfoDialog}
                    order={orderState.data}
                />
                <OrderItemsDialog
                    onClose={() => setOpenItemsDialog(false)}
                    open={openItemsDialog}
                    lineItems={orderState.data?.lineItems}
                    products={productsState.data?.products}
                    orderId={orderState.data?.id}
                    onUpdate={setOrderState}
                />
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>Order: Details | HS-POS</title>
            </Helmet>
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
        </>
    );
};
