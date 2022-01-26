import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Grid,
    MenuItem
} from '@material-ui/core';
import {InputField} from '../input-field';
import {useTranslation} from "react-i18next";

const statusOptions = [
  {
    label: 'Placed',
    value: 'PLACED'
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS'
  },
  {
    label: "Ready for Shipment",
    value: "READY_FOR_SHIPMENT"
  },
  {
    label: 'Shipped',
    value: 'SHIPPED'
  },
  {
    label: 'Delivered',
    value: 'DELIVERED'
  },
  {
    label: 'Complete',
    value: 'COMPLETE'
  },
  {
    label: 'Returned',
    value: 'RETURNED'
  }
];

const courierOptions = [
  {
    label: 'Nova Poshta',
    value: 'Nova Poshta',
  },
  {
    label: 'Meest Express',
    value: 'Meest Express'
  }
];

export const OrderInfoDialog = (props) => {
  const { open, onClose, order } = props;
  const {t} = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: order?.address || '',
      courierName: order?.courier || '',
      courierBranchNumber: order?.branchNumber || '',
      instagram: order?.customer.instagram || '',
      phone: order?.customer.phone || '',
      status: order?.status || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255).required('Address is required'),
      courierName: Yup.string().max(255).oneOf(courierOptions.map((option) => option.value)).required('Courier is required'),
      courierBranchNumber: Yup.string().max(5).required("Branch number is required"),
      instagram: Yup.string().max(255).required('Instagram is required'),
      phone: Yup.string().max(255).required('Phone number is required'),
      status: Yup.string().max(255).required('Status is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Order updated');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
    >
      <DialogTitle>
        {t("Edit order")}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.instagram && formik.errors.instagram)}
              fullWidth
              helperText={formik.touched.instagram && formik.errors.instagram}
              label="Instagram"
              name="instagram"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.instagram}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label={t("Delivery Address")}
              name="deliveryAddress"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </Grid>
          <Grid
              item
              xs={12}
          >
            <InputField
                error={Boolean(formik.touched.courierName && formik.errors.courierName)}
                fullWidth
                helperText={formik.touched.courierName && formik.errors.courierName}
                label={t("Courier")}
                name="courierName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.courierName}
            >
              {courierOptions.map((courier) => (
                  <MenuItem
                      key={courier.value}
                      value={courier.value}
                  >
                    {t(courier.label)}
                  </MenuItem>
              ))}
            </InputField>
          </Grid>
          <Grid
              item
              xs={12}
          >
            <InputField
                error={Boolean(formik.touched.courierBranchNumber && formik.errors.courierBranchNumber)}
                fullWidth
                helperText={formik.touched.courierBranchNumber && formik.errors.courierBranchNumber}
                label={t("Branch Number")}
                name="courierBranchNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.courierBranchNumber}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label={t("Phone")}
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.status && formik.errors.status)}
              fullWidth
              helperText={formik.touched.status && formik.errors.status}
              label={t("Status")}
              name="status"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.status}
            >
              {statusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {t(option.label)}
                </MenuItem>
              ))}
            </InputField>
          </Grid>
          {formik.errors.submit && (
            <Grid
              item
              xs={12}
            >
              <FormHelperText error>
                {formik.errors.submit}
              </FormHelperText>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
          variant="text"
        >
          {t("Cancel")}
        </Button>
        <Button
          color="primary"
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          {t("Save Changes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderInfoDialog.defaultProps = {
  open: false
};

OrderInfoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object
};
