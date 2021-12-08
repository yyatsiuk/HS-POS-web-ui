import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {Avatar, Box, Button, Card, CardHeader, Divider, IconButton} from '@material-ui/core';
import {useDialog} from '../../hooks/use-dialog';
import {ExternalLink as ExternalLinkIcon} from '../../icons/external-link';
import {Trash as TrashIcon} from '../../icons/trash';
import {ActionList} from '../action-list';
import {ActionListItem} from '../action-list-item';
import {ConfirmationDialog} from '../confirmation-dialog';
import {PropertyList} from '../property-list';
import {PropertyListItem} from '../property-list-item';
import {stringAvatar} from "../../utils/input-formatter";
import {useTranslation} from "react-i18next";

export const CustomerInfo = (props) => {
    const {customer, onEdit, ...other} = props;
    const [deleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog();
    const {t} = useTranslation();

    const handleDelete = () => {
        handleCloseDeleteDialog();
        toast.error('This action is not available on demo');
    };

    return (
        <>
            <Card
                variant="outlined"
                {...other}
            >
                <CardHeader
                    action={(
                        <Button
                            color="primary"
                            onClick={onEdit}
                            variant="text"
                        >
                            {t("Edit")}
                        </Button>
                    )}
                    title={t("Contact Info")}
                />
                <Divider/>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        px: 3,
                        py: 1.5
                    }}
                >
                    <Avatar {...stringAvatar(customer.fullName, 64, 64)} />
                    <IconButton color="inherit" href={customer.instagram} target="_blank">
                        <ExternalLinkIcon/>
                    </IconButton>
                </Box>
                <PropertyList>
                    <PropertyListItem
                        divider
                        label={t("Full Name")}
                        value={customer.fullName}
                    />
                    <PropertyListItem
                        divider
                        label={t("Phone")}
                        value={customer.phone}
                    />
                    <PropertyListItem
                        divider
                        label={t("Address")}
                        value={customer.address}
                    />
                </PropertyList>
                <Divider/>
                <ActionList>
                    <ActionListItem
                        icon={TrashIcon}
                        label={t("Delete User Data")}
                        onClick={handleOpenDeleteDialog}
                    />
                </ActionList>
            </Card>
            <ConfirmationDialog
                message="Are you sure you want to delete the user data? This can't be undone."
                onCancel={handleCloseDeleteDialog}
                onConfirm={handleDelete}
                open={deleteDialogOpen}
                title={t("Delete user data")}
                variant="error"
            />
        </>
    );
};

CustomerInfo.propTypes = {
    onEdit: PropTypes.func,
    customer: PropTypes.object.isRequired
};
