import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {Avatar, Box, Button, Card, CardContent, FormHelperText, Grid, Typography} from '@material-ui/core';
import {InputField} from '../input-field';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/use-auth";


export const AccountDetails = (props) => {
  const {t} = useTranslation();
  const {user} = useAuth();
  console.log(user);
  const formik = useFormik({
    initialValues: {
      email: 'chen.simmons@acmecorp.com',
      fullName: 'Kate Heida',
      jobTitle: 'Operation',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      fullName: Yup.string().max(255).required('Full Name is required'),
      jobTitle: Yup.string().max(255).required('Job name is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Settings saved');
        helpers.resetForm();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Card
      variant="outlined"
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {t("Settings")}
            </Typography>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    pb: 3
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64
                    }}
                  />
                  <div>
                    <Grid
                      container
                      spacing={1}
                      sx={{ pb: 1 }}
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          type="button"
                          variant="outlined"
                        >
                          {t("Upload new picture")}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          type="button"
                          variant="text"
                        >
                          {t("Delete")}
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                    >
                      {t("Recommended dimensions is 200x200, maximum file size is 5MB")}
                    </Typography>
                  </div>
                </Box>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                      fullWidth
                      helperText={formik.touched.fullName && formik.errors.fullName}
                      label={t("Full Name")}
                      name="fullName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label={t("Email address")}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
                      fullWidth
                      helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                      label={t("Job title")}
                      name="jobTitle"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.jobTitle}
                    />
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
                  <Grid
                    item
                    xs={12}
                  >
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {t("Save settings")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
