import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Grid} from '@material-ui/core';
import {customerApi} from '../api/customer';
import {CustomerDialog} from '../components/customer/customer-dialog';
import {CustomerInfo} from '../components/customer/customer-info';
import {CustomerNotes} from '../components/customer/customer-notes';
import {ResourceError} from '../components/resource-error';
import {ResourceLoading} from '../components/resource-loading';
import gtm from '../lib/gtm';
import useHttp from "../hooks/use-http";
import {useParams} from "react-router-dom";

export const CustomerSummary = () => {
    const {customerId} = useParams();
    const [customerState, setCustomerState] = useState({isLoading: true});
    const [ordersState, setOrdersState] = useState({isLoading: true});
    const [notesState, setNotesState] = useState({isLoading: true});
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const requestMethod = useHttp()

    const getCustomer = () => customerApi.getCustomer(customerId === ":id" ? null : customerId);
    const getCustomerOrders = () => customerApi.getCustomerOrders();
    const getCustomerNotes = () => customerApi.getCustomerNotes();

    useEffect(() => {
        requestMethod(getCustomer, setCustomerState).catch(console.error);
        requestMethod(getCustomerOrders, setOrdersState).catch(console.error);
        requestMethod(getCustomerNotes, setNotesState).catch(console.error);
    }, []);

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    const renderContent = () => {
        // Wait for all resources to load
        if (customerState.isLoading || notesState.isLoading || ordersState.isLoading) {
            return (
                <ResourceLoading/>
            );
        }

        // If any resource has an error, display only 1 error message
        if (customerState.error || notesState.error || ordersState.error) {
            return (
                <ResourceError/>
            );
        }

        return (
            <>
                <Grid
                    container
                    spacing={3}
                >
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
                            <CustomerInfo
                                onEdit={() => setOpenInfoDialog(true)}
                                customer={customerState.data}
                            />
                        </Grid>
                    </Grid>
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
                            <CustomerNotes notes={notesState.data}/>
                        </Grid>
                    </Grid>
                </Grid>
                <CustomerDialog
                    customer={customerState.data}
                    onClose={() => setOpenInfoDialog(false)}
                    open={openInfoDialog}
                    onUpdate={setCustomerState}
                />
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>Customer: Summary | HS-POS Dashboard</title>
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
