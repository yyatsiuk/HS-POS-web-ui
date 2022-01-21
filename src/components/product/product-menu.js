import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import {usePopover} from '../../hooks/use-popover';
import {DotsVertical as DotsVerticalIcon} from '../../icons/dots-vertical';
import {useTranslation} from "react-i18next";
import {productApi} from "../../api/product";

export const ProductMenu = ({productId, onDelete, ...props}) => {
    const navigate = useNavigate();
    const [anchorRef, open, handleOpen, handleClose] = usePopover();
    const {t} = useTranslation();

    const handleEdit = () => {
        handleClose();
        navigate(`/dashboard/products/${productId}`);
    };

    const handleDelete = async () => {
        try {
            await productApi.deleteProduct(productId);
        } catch (error) {
            toast.success(t("An error occurred during customer deletion"));
            return;
        }

        handleClose();
        onDelete(productId)
        toast.success(t("Product was successfully deleted"));
    };

    return (<>
            <IconButton
                onClick={handleOpen}
                ref={anchorRef}
                {...props}
            >
                <DotsVerticalIcon fontSize="small"/>
            </IconButton>
            <Menu
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top', horizontal: 'right'
                }}
            >
                <MenuItem onClick={handleEdit}>
                    {t("Edit")}
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    {t("Delete")}
                </MenuItem>
            </Menu>
        </>);
};
