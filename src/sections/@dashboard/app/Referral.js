import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Box,
  Stack,
  Card,
  CardHeader,
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Alert
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

Referral.propTypes = {
  Contract: PropTypes.object,
  Account: PropTypes.string
};

export default function Referral({ Contract, Account }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const AddressSchema = Yup.object().shape({
    address: Yup.string().required('Wallet is required')
  });
  const formik = useFormik({
    initialValues: {
      address: `${window.location.host}?ref=0x09Af4f153D4767eE0d9c11fD16F3343725A82d19`
    },
    validationSchema: AddressSchema,
    onSubmit: () => {}
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const copy = () => {
    setOpen(true);
    navigator.clipboard.writeText(
      `${window.location.host}?ref=0x09Af4f153D4767eE0d9c11fD16F3343725A82d19`
    );
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Card>
      <CardHeader title="Referral" variant="h1" />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} justifyContent="space-between" sx={{ my: 2 }}>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">Your link</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button fullWidth size="small" variant="contained" onClick={copy}>
                        Copy
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                          Referral link copied.
                        </Alert>
                      </Snackbar>
                    </InputAdornment>
                  )
                }}
                fullWidth
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
