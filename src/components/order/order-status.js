import {useState} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {Button, Card, CardContent, CardHeader, Divider, Typography} from '@material-ui/core';
import {useDialog} from '../../hooks/use-dialog';
import {CheckCircle as CheckCircleIcon} from '../../icons/check-circle';
import {ActionList} from '../action-list';
import {ActionListItem} from '../action-list-item';
import {ConfirmationDialog} from '../confirmation-dialog';
import {StatusSelect} from '../status-select';
import {OrderTimeline} from './order-timeline';
import {useTranslation} from "react-i18next";
import {orderApi} from "../../api/order";
import {useParams} from "react-router-dom";

const statusOptions = [
    {
        color: 'warning.main',
        label: 'Placed',
        value: 'PLACED'
    },
    {
        color: 'secondary.dark',
        label: 'In Progress',
        value: 'IN_PROGRESS'
    },
    {
        color: 'secondary.light',
        label: "Ready for Shipment",
        value: "READY_FOR_SHIPMENT"
    },
    {
        color: 'info.dark',
        label: 'Shipped',
        value: 'SHIPPED'
    },
    {
        color: 'info.light',
        label: 'Delivered',
        value: 'DELIVERED'
    },
    {
        color: 'success.main',
        label: 'Complete',
        value: 'COMPLETE'
    },
    {
        color: 'error.main',
        label: 'Returned',
        value: 'RETURNED'
    }
];

export const OrderStatus = (props) => {
    const {order, onMarkAsPaid, ...other} = props;
    const {orderId} = useParams();
    const [markDialogOpen, handleOpenMarkDialog, handleCloseMarkDialog] = useDialog();
    const [status, setStatus] = useState(order?.status || '');
    const [newStatus, setNewStatus] = useState(order?.status || '');
    const {t} = useTranslation();


    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleSaveChanges = async () => {
        setStatus(newStatus);
        await orderApi.partialUpdateOrder(orderId, {status: newStatus});
        toast.success('Changes saved');
    };

    const handleMark = async () => {
        await orderApi.partialUpdateOrder(orderId, {paymentStatus: "PAID"});
        onMarkAsPaid();
        handleCloseMarkDialog();
    };

    return (
        <>
            <Card
                variant="outlined"
                {...other}
            >
                <CardHeader title={t("Order Status")}/>
                <Divider/>
                <CardContent>
                    <StatusSelect
                        onChange={handleStatusChange}
                        options={statusOptions}
                        value={newStatus}
                    />
                    <Button
                        color="primary"
                        onClick={handleSaveChanges}
                        sx={{my: 2}}
                        variant="contained"
                    >
                        {t("Save Changes")}
                    </Button>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            display: 'block'
                        }}
                        variant="caption"
                    >
                        {`${t("Updated")} ${format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm')}`}
                    </Typography>
                    <Divider sx={{my: 2}}/>
                    <OrderTimeline status={status} createdAt={new Date(order.createdAt)}/>
                </CardContent>
                <Divider/>
                <ActionList>
                    <ActionListItem
                        icon={CheckCircleIcon}
                        label={t("Mark as Paid")}
                        onClick={handleOpenMarkDialog}
                    />
                </ActionList>
            </Card>
            <ConfirmationDialog
                message="Are you sure you want to mark this order as paid? This can't be undone."
                onCancel={handleCloseMarkDialog}
                onConfirm={handleMark}
                open={markDialogOpen}
                title="Mark Order as paid"
                variant="info"
            />
        </>
    );
};

OrderStatus.propTypes = {
    order: PropTypes.object
};
