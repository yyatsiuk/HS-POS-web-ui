import {useState} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {Button, Card, CardContent, CardHeader, Divider, Typography} from '@material-ui/core';
import {useDialog} from '../../hooks/use-dialog';
import {Archive as ArchiveIcon} from '../../icons/archive';
import {CheckCircle as CheckCircleIcon} from '../../icons/check-circle';
import {Duplicate as DuplicateIcon} from '../../icons/duplicate';
import {ReceiptRefund as ReceiptRefundIcon} from '../../icons/receipt-refund';
import {ActionList} from '../action-list';
import {ActionListItem} from '../action-list-item';
import {ConfirmationDialog} from '../confirmation-dialog';
import {StatusSelect} from '../status-select';
import {OrderTimeline} from './order-timeline';

const statusOptions = [
  {
    color: 'warning.main',
    label: 'Placed',
    value: 'placed'
  },
  {
    color: 'secondary.dark',
    label: 'In Progress',
    value: 'inProgress'
  },
  {
    color: 'secondary.light',
    label: "Ready for Shipment",
    value: "ready"
  },
  {
    color: 'info.dark',
    label: 'Shipped',
    value: 'shipped'
  },
  {
    color: 'info.light',
    label: 'Delivered',
    value: 'delivered'
  },
  {
    color: 'success.main',
    label: 'Complete',
    value: 'complete'
  },
  {
    color: 'error.main',
    label: 'Returned',
    value: 'returned'
  }
];

export const OrderStatus = (props) => {
  const { order, ...other } = props;
  const [markDialogOpen, handleOpenMarkDialog, handleCloseMarkDialog] = useDialog();
  const [duplicateDialogOpen, handleOpenDuplicateDialog, handleCloseDuplicateDialog] = useDialog();
  const [archiveDialogOpen, handleOpenArchiveDialog, handleCloseArchiveDialog] = useDialog();
  const [status, setStatus] = useState(order?.status || '');
  const [newStatus, setNewStatus] = useState(order?.status || '');

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSaveChanges = () => {
    setStatus(newStatus);
    toast.success('Changes saved');
  };

  const handleMark = () => {
    handleCloseMarkDialog();
    toast.error('This action is not available on demo');
  };

  const handleDuplicate = () => {
    handleCloseDuplicateDialog();
    toast.error('This action is not available on demo');
  };

  const handleArchive = () => {
    handleCloseArchiveDialog();
    toast.error('This action is not available on demo');
  };

  return (
    <>
      <Card
        variant="outlined"
        {...other}
      >
        <CardHeader title="Order Status" />
        <Divider />
        <CardContent>
          <StatusSelect
            onChange={handleStatusChange}
            options={statusOptions}
            value={newStatus}
          />
          <Button
            color="primary"
            onClick={handleSaveChanges}
            sx={{ my: 2 }}
            variant="contained"
          >
            Save Changes
          </Button>
          <Typography
            sx={{
              color: 'text.secondary',
              display: 'block'
            }}
            variant="caption"
          >
            {`Updated ${format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm')}`}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <OrderTimeline status={status} />
        </CardContent>
        <Divider />
        <ActionList>
          <ActionListItem
            icon={CheckCircleIcon}
            label="Mark as Paid"
            onClick={handleOpenMarkDialog}
          />
          <ActionListItem
            icon={DuplicateIcon}
            label="Duplicate Order"
            onClick={handleOpenDuplicateDialog}
          />
          <ActionListItem
            disabled
            icon={ReceiptRefundIcon}
            label="Request a Refund"
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
      <ConfirmationDialog
        message="Are you sure you want to duplicate this order? This can't be undone."
        onCancel={handleCloseDuplicateDialog}
        onConfirm={handleDuplicate}
        open={duplicateDialogOpen}
        title="Duplicate Order"
        variant="warning"
      />
    </>
  );
};

OrderStatus.propTypes = {
  order: PropTypes.object
};
